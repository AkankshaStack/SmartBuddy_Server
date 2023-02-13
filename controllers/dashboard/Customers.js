const Customer = require("../../models/customers.model");
const Device = require("../../models/device.model");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registerCustomer: async (req, res) => {
    try {
      const matched = await Customer.findByEmail(req.body.email);
      const mobileExist = await Customer.findByMobile(req.body.mobile);
      if (matched[0].length > 0 || mobileExist[0].length > 0) {
        return res.status(200).send({
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

  loginCustomer: async (req, res) => {
    console.log("Data");
    try {
      const { email, password } = req.body;
      // Find the user by email

      if (email && password) {
        const [data, _] = await Customer.findByEmail(email);
        if (data.length === 0) {
          return res
            .status(200)
            .send({ status: 404, message: "User Not found" });
        }
        const { password: hash, id } = data[0];
        const check = await bcrypt.compare(password, hash);

        if (check) {
          const accessToken = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
          console.log(accessToken);
          return res.status(200).send({
            status: 200,
            accessToken,
            data: {
              userId: id,
              email,
            },
            message: "LoggedIN",
          });

          // Refresh token
          if (ccheck) {
            const refreshToken = await jwt.sign(
              { userId: id },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "20m",
              }
            );
            // Set refersh token in refreshTokens array
            refreshTokens.push(refreshToken);

            res.json({
              accessToken,
              refreshToken,
            });

            let refreshTokens = [];
          }
        } else {
          console.log("Incorrect passowrd");
          return res
            .status(200)
            .send({ status: 422, message: "Incorrect password" });
        }
      }
      // console.log(match);
      return res.status(500).send({ message: "Error comparing passwords" });
    } catch (error) {
      return res
        .status(200)
        .send({ status: 500, message: "Something went wrong" });
      // If the password is correct, generate a JWT and return it
    }
  },

  resetPassword: async (req, res) => {},
  getRegisteredCustomers: async (req, res) => {
    try {
      const [data, _] = await Customer.getAllCustomers();
      // console.log(data);
      return res.status(200).send({
        message: "success",
        data: data,
        status: 200,
      });
    } catch {
      (err) => {
        console.log(err);
        return res.status(500);
      };
    }
  },
  showDevice: async (req, res) => {
    try {
      const [data, _] = await Device.getDeviceByUserId(req.body.c_id);
      console.log(data);
      return res.status(200).send({
        message: "sucess",
        data: data,
        status: 200,
      });
    } catch {
      (err) => {
        console.log(err);
        return res.status(500);
      };
    }
  },
  addContextualAds: async (req, res) => {},
};
