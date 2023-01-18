const db = require("../mysql/mysqlConnection");
const table = "customers";
class Customers {
  constructor(id, name, email, mobile, password, createdAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.createdAt = createdAt;
  }

  save() {
    let sql = `
        INSERT INTO customers(
            id,
            name,
            email,
            mobile,
            password,
            createdAt
        )
        values(
            '${this.id}',
            '${this.name}',
            '${this.email}',
            '${this.mobile}',
            '${this.password}',
            '${this.createdAt}'
        )`;
    const res = db.execute(sql);
    return res;
  }

  static findById(id) {
    let sql = `SELECT * from ${table} where id = ${id}`;
    return db.execute(sql);
  }
  static findByEmail(email) {
    let sql = `SELECT * from ${table} where email = "${email}"`;
    return db.execute(sql);
  }
  static findByMobile(mobile) {
    let sql = `SELECT * from ${table} where mobile = ${mobile}`;
    return db.execute(sql);
  }
}

module.exports = Customers;

// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', {
//         // Model attributes are defined here
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         lastName: {
//             type: DataTypes.STRING
//             // allowNull defaults to true
//         }
//     });

//     return User;
// }
