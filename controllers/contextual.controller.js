// const jwt = require('jsonwebtoken');
const Contextual = require('../models/contextual.model');
const multiparty = require('multiparty');
const path = require("path");
const fse = require = require("fs-extra");

exports.getData = async (req, res, next) => {

    try {
        const [data, _] = await Contextual.findAll();
        return res.status(200).json(data);
    }
    catch {
        (err) => {
            console.log(err);
            return res.status(500);
        }
    }
    // const token = req.query.token;
    // if(!token) {
    //     return res.status(401)
    //             .send("Unauthorized! No Token.");
    // }

    // const device_id = getDeviceId(token);
    // console.log(device_id);

    // const resJson = {
    //     date:"",
    //     productSKU: "Tata Salt",
    //     brand:"tata",
    //     quantity: 2,
    //     price: 10,
    //     total: 20
    // }
    // res.status(200).send(resJson);


    // const q = `SELECT * FROM users_history WHERE username="${username}"`;
    // // console.log(q);
    // conn.query(q, (err, results, fields) => {
    //     if(err) console.log(err);
    //     if(!results) console.log("No results found!");
    //     else{
    //         res.status(200).send(results);
    //     }
    // })
}



exports.postData = async (req, res, next) => {
    let device_id = req.body.device_id;
    let playtime = req.body.playtime;
    let video = req.body.video;
    const contextual = new Contextual(device_id, playtime, video);
    try {
        const [data, _] = await contextual.save();
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        
    }
}

// get file extension
const extractExt = (filename) => filename.slice(filename.lastIndexOf("."), filename.length);
// demo directory
const UPLOAD_DIR = path.resolve(__dirname, "..", "target");

// create a directory for temporary storage of chunks
// add the 'chunkDir' prefix to distinguish it from the chunk name
const createChunkDir = (fileHash) => path.resolve(UPLOAD_DIR, `chunkDir_${fileHash}`);

// write to file stream
const pipeStream = (path, writeStream) =>
    new Promise(resolve => {
        const readStream = fse.createReadStream(path);
        readStream.on("end", () => {
            fse.unlinkSync(path);
            resolve();
        });
        readStream.pipe(writeStream);
    });

// merge file chunks
const mergeFileChunk = async (filePath, fileHash, size) => {
    const chunkDir = createChunkDir(fileHash);
    const chunkPaths = await fse.readdir(chunkDir);

    // sort by chunk index
    // otherwise, the order of reading the directory may be wrong
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);

    // write file concurrently
    await Promise.all(
        chunkPaths.map((chunkPath, index) =>
            pipeStream(
                path.resolve(chunkDir, chunkPath),
                // create write stream at the specified starting location according to size
                fse.createWriteStream(filePath, {
                    start: index * size
                })
            )
        )
    );
    // delete chunk directory after merging
    fse.rmdirSync(chunkDir);
};

const resolvePost = (req) =>
    new Promise(resolve => {
        let chunk = "";
        req.on("data", data => {
            chunk += data;
        });
        req.on("end", () => {
            resolve(JSON.parse(chunk));
        });
    });

// return chunk names which is uploaded
const createUploadedList = async fileHash =>
    fse.existsSync(path.resolve(UPLOAD_DIR, fileHash))
        ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash))
        : [];


exports.handleMerge = async (req, res, next) => {
    // const data = await resolvePost(req);
    // console.log(data);
    const { fileHash, filename, size } = req.body;
    const ext = extractExt(filename);
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
    await mergeFileChunk(filePath, fileHash, size);
    res.end(
        JSON.stringify({
            code: 0,
            message: "file merged success"
        })
    );
};


// delete all files
exports.deleteFiles = async (req, res, next) => {
    await fse.remove(path.resolve(UPLOAD_DIR));
    res.end(
        JSON.stringify({
            code: 0,
            message: "file delete success"
        })
    );
}


// process chunk
exports.handleFormData = (req, res, next) => {
    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err);
            res.status = 500;
            res.end("process file chunk failed");
            return;
        }
        const [chunk] = files.chunk;
        const [hash] = fields.hash;
        const [fileHash] = fields.fileHash;
        const [filename] = fields.filename;
        const filePath = path.resolve(
            UPLOAD_DIR,
            `${fileHash}${extractExt(filename)}`
        );
        const chunkDir = createChunkDir(fileHash);
        const chunkPath = path.resolve(chunkDir, hash);

        // return if file exists
        if (fse.existsSync(filePath)) {
            res.end("file exist");
            return;
        }

        // return if chunk is exists
        if (fse.existsSync(chunkPath)) {
            res.end("chunk exist");
            return;
        }

        // if chunk directory is not exist, create it
        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir);
        }

        // fs-extra 的 rename 方法 windows 平台会有权限问题
        // use fs.move instead of fs.rename
        // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
        await fse.move(chunk.path, path.resolve(chunkDir, hash));
        res.end("received file chunk");
    });
}

// Verify if a chunk is uploaded/uploaded
exports.handleVerifyUpload = async (req, res, next) => {
    // const data = await resolvePost(req);
    const { fileHash, filename } = req.body;
    const ext = extractExt(filename);
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
    if (fse.existsSync(filePath)) {
        res.json({shouldUpload: false});
    } else {
        res.json({
            shouldUpload: true,
            uploadedList: await createUploadedList(fileHash)
        });
    }
}


