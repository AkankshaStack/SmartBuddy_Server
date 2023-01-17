const db = require('../mysql/mysqlConnection');
const database = 'descriptive';
class Descriptive{
    constructor( playtime, device_id){
        this.playtime = playtime;
        this.device_id = device_id;
    }

    save(){
        let sql = `
        INSERT INTO ${database}(
            playtime,
            device_id
        )

        values(
            '${this.playtime}',
            ${this.device_id}
        );`
        console.group(sql);
        return db.execute(sql);
    }

    static findAll(){
        let sql = `SELECT * FROM ${database} `;
        return db.execute(sql);
    }

    // addVideo(){
    //     const bitmap = fs.readFileSync(file);
    //     const image = encode_base64('image.jpg');
    //     const video = encode_base64('image.mp4');
    //     new Buffer(bitmap).toString('base64');
    // }

    static findById(id){
        let sql = `SELECT * FROM ${database} WHERE descriptive_id=${id}`;
        return db.execute(sql);
    }

    static findById(device_id){
        let sql = `SELECT * FROM ${database} where device_id=${device_id}`
        return db.execute(sql);
    }
}

module.exports = Descriptive;