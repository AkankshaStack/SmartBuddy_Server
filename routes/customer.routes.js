const router = require('express').Router();
const customerController = require('../controllers/dashboard/Customers');

router.post('/register-customer', customerController.registerCustomer);

module.exports = router;
