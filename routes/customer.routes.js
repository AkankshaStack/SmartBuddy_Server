const router = require('express').Router();
const customerController = require('../controllers/dashboard/Customers');

router.post('/register-customer', customerController.registerCustomer);
router.get('/get-customers', customerController.getRegisteredCustomers);


module.exports = router;
