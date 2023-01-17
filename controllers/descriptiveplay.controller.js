const DescriptivePlay = require('../models/descriptiveplay.model');
exports.postPlayData = async (req, res, next) => {
  let descriptive_id = req.params.descriptive_id;
  let played_at = req.body.played_at;
  let device_id = req.body.device_id;
  let phrase = req.body.phrase;

  let descriptivePlay = new DescriptivePlay(device_id, descriptive_id, played_at, phrase);
  console.log(descriptivePlay);
  try {
    const [data, _] = await descriptivePlay.save();
    return res.status(200).json(data);
  }
  catch {
    (err) => {
      console.log(err);
      return res.status(500);
    }
  }

};

exports.getPlayData = async (req, res, next) => {
  // console.log("Hello");
  // let user_id = req.params.user_id;
  try {
    const [data, _] = await DescriptivePlay.findAll()
    // console.log(data);
    return res.status(200).json(data);
  }
  catch {
    (err) => {
      return res.status(500).json("Error: " + err);
    }
  }
}