const router = require('express').Router();
const customerController = require('../controllers/dashboard/Customers');
const verifyToken = require('../utils/userAuth');

router.post('/register-customer', customerController.registerCustomer);
router.get('/get-customers', verifyToken, customerController.getRegisteredCustomers);
router.post('/login-customer', customerController.loginCustomer);
router.post('/show-device', customerController.showDevice)
// router.post('/my-device',middleware.verifyToken, customerController.showDevice)
router.post('/my-device', verifyToken, (req, res) => {
    res.send('Protected route');
  });

module.exports = router;
