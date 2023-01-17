const db = require('../mysql/mysqlConnection');
const database = "users";
class User{
    constructor(name, email, picture){
        this.name  = name;
        this.email = email;
        this.picture = picture;
    }

    save(){
        let sql= `
        INSERT INTO users(
            username,
            email,
            picture
        )
        values(
            '${this.name}',
            '${this.email}',
            '${this.picture}'
        )`;
        console.log(sql);
        const res = db.execute(sql);
        return res
    }

    static findById(id){
        let sql = `SELECT * from ${database} where user_id = ${id}`;
        console.log(sql);
        return db.execute(sql);
    }
    static findByEmail(email){
        let sql = `SELECT * from ${database} where email = "${email}"`;
        return db.execute(sql);
    }
}

module.exports = User;

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


