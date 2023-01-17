const ContextualPlay = require('../models/contextualplay.model');

exports.postPlayData = async (req, res, next) => {
  let contextual_id = req.params.contextual_id;
  let played_at = req.body.played_at;
  let device_id = req.body.device_id;
  let phrase = req.body.phrase;

  let contextualPlay = new ContextualPlay(device_id, contextual_id, played_at, phrase);
  console.log(contextualPlay);
  try {
    const [data, _] = await contextualPlay.save();
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
    const [data, _] = await ContextualPlay.findAll()
    // console.log(data);
    return res.status(200).json(data);
  }
  catch {
    (err) => {
      return res.status(500).json("Error: " + err);
    }
  }
}