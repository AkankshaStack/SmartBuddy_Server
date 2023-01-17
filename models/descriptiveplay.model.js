const db = require('../mysql/mysqlConnection');
const database = "descriptive_play";
class DescriptivePlay {
  constructor(device_id, descriptive_id, played_at, phrase) {
    this.device_id = device_id;
    this.descriptive_id = descriptive_id;
    this.played_at = played_at;
    this.phrase = phrase;
  }

  save() {
    // console.log("Hello");
    let sql = `
        INSERT INTO ${database}(
            device_id,
            descriptive_id,
            played_at,
            phrase  
        )
        values(
            "${this.device_id}",
            ${this.descriptive_id},
            "${this.played_at}",
            "${this.phrase}"
        )`;
    console.log(sql);
    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM ${database} order by played_at desc`;
    // console.log(sql);
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM ${database} WHERE descriptive_id = ${id}`;
    console.log(sql);
    return db.execute(sql);
  }
}
module.exports = DescriptivePlay;