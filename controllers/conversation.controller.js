const Conversation = require('../models/conversation.model');

exports.postData = async (req, res, next) => {
    let timestamp = req.body.timestamp;
    let text = req.body.text;

    let conversation = new Conversation(timestamp, text);
    console.log(conversation);
    try {
        const [data, _] = await conversation.save();
        return res.status(200).json(data);
    }
    catch {
        (err) => {
            console.log(err);
            return res.status(500);
        }
    }
}

exports.getData = async (req, res, next) => {
    // console.log("Hello");
    // let user_id = req.params.user_id;
    try {
        const [data, _] = await Conversation.findAll()
        // console.log(data);
        return res.status(200).json(data);
    }
    catch {
        (err) => {
            return res.status(500).json("Error: " + err);
        }
    }
}