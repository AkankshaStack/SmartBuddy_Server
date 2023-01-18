const BarCode = require("../models/barcode_scan.model");
exports.getData = async (req, res, next) =>{
    try{
        const[data, _] = await BarCode.findAll();
        return res.status(200).json(data);
    }
    catch{
        (err) =>{
            console.log(err);
            return res.status(500);
        }
    }
}

exports.postData = async (req, res, next) =>{
let device_id = req.body.device_id ;
let played_at = req.body.played_at;
let phrase = req.body.phrase;
let product_name = req.body.product_name;
let quantity = req.body.quantity;
let packaging = req.body.packaging;

const barCodeScan = new BarCode(device_id, played_at, phrase, product_name, quantity, packaging);
console.log(barCodeScan);
try{
    const [data, _] = await retail.save();
    console.log(data);
    return res.status(200).json(data);
}
catch{
    (err) =>{
        console.log(err);
        return res.status(500).json("Error" , err);
    }
}
};