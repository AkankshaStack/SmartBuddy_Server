const db = require("../mysql/mysqlConnection");
const dbConn = require("../mysql/dbConn");
const database = "device";
class Device {
  constructor(serial_no, ram, store, todayDate) {
    this.serial_no = serial_no;
    this.RAM = ram;
    this.store = store;
    this.createdAt = todayDate;
    this.MAC= 'new'

  }

  save() {
    let date = new Date();
    let sql = `
        INSERT INTO device(
          serial_no,
          MAC,
            RAM,
            store, 
            createdAt
        )
        values(
          '${this.serial_no}',
          '${this.MAC}',
            '${this.RAM}',
            '${this.store}',
            '${this.createdAt}'
            
        )`;
    console.log(sql);
    const res = db.execute(sql);
    console.log(res);
    return res;
  }

  static findByMACId(MAC) {
    let sql = `SELECT * from ${database} where MAC="${MAC}";`;
    console.log(sql);
    return db.execute(sql);
  }

  static  getLastRow() {
    let sql = `SELECT * FROM ${database} ORDER BY serial_no DESC LIMIT 1;`;
    dbConn.query(sql, (error, results, fields) => {
      if (error) {
        console.log(error.message)
        return console.error(error.message);
      }
      console.log(results)
      return results;
    });
    dbConn.end(); 

  }
  static findBySerialNo(serial_no) {

    let sql = `SELECT * FROM ${database} WHERE serial_no = "${serial_no}";`;
    
    console.log(serial_no);
    return db.execute(sql);
  }
  static getAllDevices() {
    let sql = `SELECT * FROM ${database} WHERE user_id IS NULL OR user_id = '';`;
    return db.execute(sql);
  }
  static assginDeviceToUser(customer_id, serial_no) {
    let sql = `UPDATE ${database} SET user_id = "${customer_id}" WHERE user_id IS NULL OR user_id = '' AND serial_no = "${serial_no}";`;
    return db.execute(sql);
  }
  
}

module.exports = Device;
