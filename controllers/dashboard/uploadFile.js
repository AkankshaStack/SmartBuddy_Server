require("dotenv").config();

const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

// Define the S3 bucket
const bucketName = 'buddysmartaws';

const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

const uploadData = async function (req, res, next) {
  console.log(req.file);
  res.send("Sucessfully Uploaded" + req.file.location + "location!");
};

const listData = async (req, res) => {
  let r = await s3.listObjectsV2({ Bucket: bucketName }).promise();
  let x = r.Contents.map((item) => item.key);
  res.send(x);
};

const downloadData = async (req, res) => {
  const filename = req.params.filename;
  let x = await s3.getObject({ Bucket: bucketName, key: filename }).promise();
  res.send(x.Body);
};

const deleteData = async (req, res) => {
  const filename = req.params.filename;
  await s3.deleteObject({ Bucket: bucketName, key: filename }).promise();
  res.send("File Deleted Sucessfully");
};

module.exports = {
  uploadData,
  listData,
  downloadData,
  deleteData,
};
