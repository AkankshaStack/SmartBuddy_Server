const db = require('../mysql/mysqlConnection');
const database = "contextual_play";
class ContextualPlay {
  constructor(device_id, contextual_id, played_at, phrase) {
    this.device_id = device_id;
    this.contextual_id = contextual_id;
    this.played_at = played_at;
    this.phrase = phrase;
  }

  save() {
    // console.log("Hello");
    let sql = `
        INSERT INTO ${database}(
            device_id,
            contextual_id,
            played_at,
            phrase  
        )
        values(
            "${this.device_id}",
            ${this.contextual_id},
            "${this.played_at}",
            "${this.phrase}"
        )`;
    // console.log(sql);
    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM ${database} ORDER BY played_at DESC;`;
    // console.log(sql);
    return db.execute(sql);
  }
  static findById(device_id) {
    let sql = `SELECT * FROM ${database} WHERE device_id = ${device_id}`;
    return db.execute(sql);
  }
}
module.exports = ContextualPlay;
