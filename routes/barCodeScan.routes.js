const router = require('express').Router();
const barCodeScanController = require('../controllers/barCodeScan.controller');

router.route("/barcode")
    .get(barCodeScanController.getData)
    .post(barCodeScanController.postData);
    
module.exports = router;