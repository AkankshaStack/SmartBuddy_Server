const Game = require('../models/game.model');

exports.getGame = async (req, res, next) =>{
    try{
        const [data, _] = await Game.findAll();
        return res.status(200).json(data);
    }
    catch{
        (err) =>{
            console.log(err);
            return res.status(500);
        }
    }
}

exports.getGameById = async (req, res, next) =>{
    const id = req.params.id;
    try{
        const [data, _] = await Game.findById(id);
        return res.status(200).json(data);
    }
    catch{
        (err) =>{
            console.log(err);
            return res.status(500);
        }
    }
}

exports.postGame = async (req, res, next) =>{
    let game_name = req.body.game_name;
    let expected_duration = req.body.expected_duration;
    let created_by = req.body.created_by;
    let questions = req.body.questions;
    let prize = req.body.prize;
    
    const game = new Game(game_name, expected_duration, prize, created_by, questions)
    // console.log(game);
    try{
        const [data, extra] = await game.save();
        console.log(extra);
        return res.status(200).json(data);
    }
    catch{
        (err) =>{
            console.log(err);
            return res.status(500);
        }
    }
}