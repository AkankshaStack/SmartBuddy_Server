const conn = require('../mysql/mysqlConnection');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Device = require('../models/device.model');
const User = require('../models/user.model');
const verifyToken = require("../utils/googleOAuth");
// const {User} = require("./models");

exports.verifyDevice = async (req, res, next) => {
    let MAC = req.body.MAC;
    if (!MAC) return res.status(401);
    console.log(MAC);
    try {
        const [data, extra] = await Device.findByMACId(MAC);
        console.log(data);
        if (data.length == 0) return res.status(401).json({errior:"No Such Registered Devices!"});
        
        return res.json({ message: "Device Verified!" }).status(200);
    }
    catch {
        (err) => {
            console.log(err);
            return res.json({ error: err }).status(401);
        }
    }
};

exports.googleLogin = async (req, res, next) => {
    const token = req.body.token;
    const ticket = await verifyToken(token);
    const {email, picture, name} = ticket.payload;
    console.log(name, email, picture);
    try {
        const [user, _] = await User.findByEmail(email)
        console.log(user + "  " + typeof(user));
        if (user.length == 0) {
            const user = new User(name, email, picture);
            console.log(user);
            const [data, extra] = await user.save();
            console.log(data.insertId);
            const [userData, _] = await User.findById(data.insertId);
            console.log(user);
            console.log(userData[0]);
            const token = jwt.sign(
                userData[0],
                process.env.JWT_SECRET
            );
            console.log(token);
            return res.status(200).json({
                user: userData[0],
                token: token
            });
        }
        else {
            return res.status(200).json(user[0]);
        }
    }
    catch {
        (err) => {
            console.log(err);
            return res.status(500).json(err);
        }
    };
};

exports.googleSignup = async (req, res, next) => {
    const token = req.params.token;
    if (!token) return res.status(400);
    const jwtToken = jwt.decode(token);
    console.log(jwtToken);
    const name = jwtToken.name;
    const email = jwtToken.email;
    const picture = jwtToken.picture;
    // const name = req.body.name;
    // const email = req.body.email;
    // const picture = req.body.picture;
    // console.log(req.body);
    const user = new User(name, email, picture);
    console.log(user);
    try {
        const [data, extra] = await user.save();
        console.log(data.insertId);
        const [userData, _] = await User.findById(data.insertId);
        user = userData[0];
        console.log(user);
        console.log(userData[0]);
        const token = jwt.sign(
            userData[0],
            process.env.JWT_SECRET
        );
        console.log(token);
        return res.status(200).json({
            user: userData[0],
            token: token
        });
    }
    catch {
        (err) => {
            console.log(err);
            return res.status(500);
        }
    }

    // try{
    //     const user = new User(name, email);

    // }
};

exports.signup = async (req, res, next) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400);
    }
    const user = new User(null, email,null);
    console.log(user);
    return res.status(200).json(user);
    // try{
    // const [userData, _] = await user.save();
         
    // }catch{(err)=>{
    //     console.log(err);
    // }}
}

exports.getDeviceStatus = async (req, res, next) =>{
    const user_id = req.query.user_id;
    if(!user_id) return res.status(400);
    console.log(user_id);
    try{
        const[deviceData, _]  = await Device.findByUserId(user_id);
        console.log(JSON.stringify(deviceData));
        return res.status(200).json({data: deviceData});
    }
    catch{(err) => {
        console.log(err);
    }}
    return res.json()
}

exports.getRefreshToken = (req, res, next) => { };
exports.verifyAccessToken = (req, res, next) => { };
exports.verifyRefreshToken = (req, res, next) => { };
exports.deleteToken = (req, res, next) => { };


// exports.]iLogin = async (req, res, next) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) return res.status(401).send("Invalid Username or Password");

//         const q = `SELECT * FROM users WHERE USERNAME = "${username}"`;
//         conn.query(q, async (err, result, fields) => {
//             if (err) console.log(err);
//             if (!result[0]) return res.status(401).json("Invalid Username or Password")
//             else {
//                 const user = result[0];
//                 // console.log(user);
//                 const match = await bcrypt.compare(password, user.PASSWORD);
//                 if(match === true){
//                     const token = jwt.sign(
//                         {
//                             username: username
//                         },
//                         process.env.JWT_SECRET);
//                     console.log("Passwords Matched!");
//                     return res.status(200).json({token: token});
//                 }
//                 else {
//                     res.status(401).send("Invalid Username or Password");
//                 }
//             }
//         });
//     }
//     catch{(err) => {
//             res.status(500).send(err);
//         }
//     };

// }

// exports.userRegister = async (req, res, next) => {

//     const { username, password } = req.body;
//     console.log(username);
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log(hashedPassword);
//         const q = `INSERT INTO users (username, password) VALUES ("${username}", "${hashedPassword}")`;
//         console.log(q);
//         conn.query(q, (err, result, fields) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send("Could not register successfully, please try again!");
//             }
//             else if (result.affectedRows === 1) {
//                 res.status(200).send('Succesfully Registered, Please Login!')
//             }
//         });
//     }

//     catch {
//         (err) => {
//             console.log(err);
//         }
//     };

// };