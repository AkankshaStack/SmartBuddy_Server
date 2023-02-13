const Device = require("../models/device.model");
const dbConn = require("../mysql/dbConn");
const database = "device";
module.exports = {
  getSerialNumber: async (req, res) => {
    try {
      let sql = `SELECT * FROM ${database} ORDER BY createdAt DESC LIMIT 5;`;
      dbConn.query(sql, (error, results, fields) => {
        if (error) {
          console.log(error.message);
          return console.error(error.message);
        }
        const serial_no = results[0].serial_no.toString().replace(/\D/g, "");
        console.log(serial_no);
        let no = parseFloat(serial_no);
        console.log(no);
        return res.status(200).send({
          message: "serial number sent!",
          data: `${"SB" + (no + 1) + "DPMNDZ"}`,
          status: 200,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  registerDevice: async (req, res, next) => {
    try {
      const matched = await Device.findBySerialNo(req.body.serialNumber);
      if (matched[0].length > 0) {
        return res.status(200).send({
          message: "Device already registered!",
          status: 400,
        });
      }
      const date = new Date();
      let todayDate = date.toISOString().slice(0, 23);
      const device = new Device(
        req.body.serialNumber,
        req.body.store,
        req.body.ram,
        todayDate
      );
      console.log(device);
      const response = await device.save();
      if (response[0].affectedRows === 1) {
        return res.status(200).send({
          message: "Device Registered Successfully!",
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Somthing went worng!" });
    }
  },
  updateDevice: async (req, res, next) => {
    try {
      const [data, _] = await Device.findAll();
      return res.status(200).json(data);
    } catch {
      (err) => {
        console.log(err);
        return res.status(500);
      };
    }
  },
  deleteDevice: async (req, res, next) => {
    try {
      const [data, _] = await Device.findAll();
      return res.status(200).json(data);
    } catch {
      (err) => {
        console.log(err);
        return res.status(500);
      };
    }
  },
  getDevices: async (req, res, next) => {
    try {
      const [data, _] = await Device.getAllDevices();
      // console.log(data)
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
  assignDeviceToCustomer: async (req, res) => {
    try {
      const [data, _] = await Device.assginDeviceToUser(req.body.customer_id, req.body.serial_no);
      console.log(data)
      if (data.affectedRows === 1) {
        return res.status(200).send({
          message: "Device Assgined Successfully!",
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Somthing went worng!" });
    }
  },
};
