const router = require('express').Router();
const deviceController = require('../controllers/device.controller');

router.post('/register-device', deviceController.registerDevice);
router.post('/assign-device-to-customer', deviceController.assignDeviceToCustomer);
router.get('/get-serial-number', deviceController.getSerialNumber);
// router.post('/assign-device', assigndeviceController.assignDevice);
router.get('/get-devices', deviceController.getDevices);

module.exports = router;
