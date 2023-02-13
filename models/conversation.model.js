const db = require('../mysql/mysqlConnection');
const database = "conversation";
class Conversation {
  constructor(id, timestamp, text) {
    this.id = id;
    this.timestamp = timestamp;
    this.text = text;
  }

  save() {
    // console.log("Hello");
    let sql = `
        INSERT INTO ${database}(
            id,
            timestamp,
            text  
        )
        values(
            "${this.id}",
            "${this.timestamp}",
            "${this.text}"
        )`;
    // console.log(sql);
    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM ${database} ORDER BY timestamp DESC;`;
    // console.log(sql);
    return db.execute(sql);
  }
  static findById(device_id) {
    let sql = `SELECT * FROM ${database} WHERE id = ${id}`;
    return db.execute(sql);
  }
}
module.exports = Conversation;
