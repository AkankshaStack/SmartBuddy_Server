const router = require('express').Router();
const retailController = require('../controllers/retail.controller');

router.route("/data")
    .get(retailController.getData)
    .post(retailController.postData);
    
module.exports = router;