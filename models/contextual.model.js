const db = require("../mysql/mysqlConnection");
const database = "contextual";
const fs = require("fs");
class Contextual {
  constructor(contextual_id, playtime, device_id) {
    this.contextual_id = contextual_id;
    this.playtime = playtime;
    this.device_id = device_id;
  }

  save() {
    let sql = `
        INSERT INTO ${database}(
            playtime,
            device_id,
            video
        )

        values(
            '${this.playtime}',
            '${this.device_id}',
            '${this.video}'
        );`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM ${database}`;
    return db.execute(sql);
  }

  // addVideo(){
  //     const bitmap = fs.readFileSync(file);
  //     const image = encode_base64('image.jpg');
  //     const video = encode_base64('image.mp4');
  //     new Buffer(bitmap).toString('base64');
  // }

  static findById(id) {
    let sql = `SELECT * FROM ${database} WHERE contextual_id=${id}`;
    return db.execute(sql);
  }
}

module.exports = Contextual;
