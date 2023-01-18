const router = require('express').Router();
const cctvStreamController = require('../controllers/cctv.controller');

router.get("/cctvStream",cctvStreamController.getData)
// router.post("/cctvStream",cctvStreamController.postData);
    
module.exports = router;