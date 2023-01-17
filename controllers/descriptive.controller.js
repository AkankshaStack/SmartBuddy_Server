const Descriptive = require('../models/descriptive.model');

exports.postData = async  (req, res, next) =>{
    let device_id = req.body.device_id;
    let playtime = req.body.playtime;
    const descriptive = new Descriptive(playtime, device_id);
    try{
        const [data, _] = await descriptive.save();
        console.log(data);
        return res.status(200).json(data);
    }
    catch{
        (err) => {
            console.log("Error: ", err);
            return res.send(500).json("Error:", err);
        }
    }
};


