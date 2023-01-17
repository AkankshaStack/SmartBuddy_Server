const GamePlay = require('../models/gameplay.model');

exports.getData = async (req, res, next) =>{
    const token = req.body.user_id;
    
    try{
        const [data, _] = await GamePlay.findAll();
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
    let played_at = req.body.played_at;
    let name = req.body.name;
    let age = req.body.age;
    let address = req.body.address;
    let mobile_no = req.body.mobile_no;
    let location = req.body.location;
    
    const gamePlay = new GamePlay(played_at, name, age, address, mobile_no, location);
    console.log(gamePlay);
    try{
        const [data,_] = await gamePlay.save(); 
        return res.status(200).json(data);
    }
    catch{
        (err) =>{
            console.log(err);
            return res.status(500);
        }
    }
}