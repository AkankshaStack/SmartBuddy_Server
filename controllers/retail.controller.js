const Retail = require("../models/retail.model");
exports.getData = async (req, res, next) =>{
    try{
        const[data, _] = await Retail.findAll();
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

const retail = new Retail(device_id, played_at, phrase, product_name, quantity, packaging);
console.log(retail);
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


// exports.postSiteOptions = (req, res, next) =>{
//     const option = req.body.value;
//     const label = option.toUpperCase();
//     console.log(option + " " + label);
//     const q = `INSERT into site_options(value,label) values("${option}", "${label}")`;
//     conn.query(q,(err, results, fields) => {
//         if(err) return res.status(500).send(`ERROR: ${err}`)
//         if(!results) console.log("No results found!");
//         else{
//             return res.status(200).send(results);
//         }
//     })
// }

// exports.getSiteOptions = (req, res, next) => {
//     const q = `SELECT * FROM site_options`
//     conn.query(q, (err, results, fields) => {
//         if(err) return res.status(500).send(`ERROR: ${err}`);
//         if(!results) console.log("No results found!");
//         else{
//             return res.status(200).send(results);
//         }
//     })
// }