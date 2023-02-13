const CctvStream = require("../models/cctv.models");

exports.getData = async (req, res, next) => {
  try {
    const [data, _] = await CctvStream.findAll();
    return res.status(200).json(data);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500);
    };
  }
};
