const db = require('../mysql/mysqlConnection');
class Retail{
    constructor(device_id, played_at, phrase, product_name, quantity, packaging){ 
        this.device_id = device_id;
        this.played_at = played_at;
        this.phrase = phrase;
        this.product_name = product_name;
        this.quantity = quantity;
        this.packaging = packaging;
    }

    save(){
        let sql= `
        INSERT INTO retail( 
            device_id,
            played_at,
            phrase,
            product_name,
            quantity,
            packaging
        )
        values(
            '${this.device_id}',
            '${this.played_at}',
            '${this.phrase}',
            '${this.product_name}',
            '${this.quantity}',
            '${this.packaging}'
        );`;
        console.log(sql);
        return db.execute(sql);
    }

    static findAll(){
        let sql = `SELECT * FROM retail order by played_at desc`;
        return db.execute(sql);
    }

    static findById(id){
        let sql = `SELECT * FROM retail where device_id=${id}`;
        return db.execute(sql);
    }
}

module.exports = Retail;