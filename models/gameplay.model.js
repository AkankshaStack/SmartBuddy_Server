const db = require('../mysql/mysqlConnection');
class GamePlay {
  constructor(played_at, name, age, address, mobile_no, location) {
    this.played_at = played_at;
    this.name = name;
    this.age = age;
    this.address = address;
    this.mobile_no = mobile_no;
    this.location = location;
  }

  save() {
    // console.log("Hello");
    let sql = `
        INSERT INTO game_play( 
            played_at,
            name, 
            age,
            address, 
            mobile_no, 
            location
        )
        values(
            '${this.played_at}',
            '${this.name}',
             ${this.age},
            '${this.address}',
            '${this.mobile_no}',
            '${this.location}'
        )`;
    console.log(sql);
    const data = db.execute(sql);
    return data;
  }

  static findAll() {
    let sql = `SELECT * FROM game_play`;
    return db.execute(sql);
  }

  static findById(id) {

  }
}

module.exports = GamePlay;