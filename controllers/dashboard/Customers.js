const Customer = require("../../models/customers.model");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  registerCustomer: async (req, res) => {
    try {
      const matched = await Customer.findByEmail(req.body.email)
      const mobileExist = await Customer.findByMobile(req.body.mobile)
      if(matched[0].length > 0 || mobileExist[0].length > 0){
        return res.status(400).send({
          message: "Email or Mobile already registered!",
          status: 400,
        });
      }
      const userId = uuidv4().slice(0, 10);
      const password = await bcrypt.hash(req.body.password, 10);
      const date = new Date();
      let todayDate = date.toISOString().slice(0, 23);
      const customer = new Customer(
        userId,
        req.body.name,
        req.body.email,
        req.body.mobile,
        password,
        todayDate
      );
      const response = await customer.save();
      if (response[0].affectedRows === 1) {
        return res.status(200).send({
          message: "Customer Registered Successfully!",
          status: 200,
        });
      } 
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Somthing went worng!" });
    }
  },
  loginCustomer: async (req, res) => {},
  resetPassword: async (req, res) => {},
  getRegisteredCustomers: async (req, res) => {},
  addDevice: async (req, res) => {},
  addContextualAds: async (req, res) => {},
};
