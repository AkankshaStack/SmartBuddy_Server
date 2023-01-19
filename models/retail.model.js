const db = require('../mysql/mysqlConnection');
class Retail{
    constructor(device_id, played_at, product_name, quantity, packaging, variations, rate){ 
        this.device_id = device_id;
        this.played_at = played_at;
        this.product_name = product_name;
        this.quantity = quantity;
        this.packaging = packaging;
        this.variations = variations;
        this.rate = rate;
    }

    save(){
        let sql= `
        INSERT INTO retail( 
            device_id,
            played_at,
            product_name,
            quantity,
            packaging, 
            variations,
            rate
        )
        values(
            '${this.device_id}',
            '${this.played_at}',
            '${this.product_name}',
            '${this.quantity}',
            '${this.packaging}',
            '${this.variations}',
            '${this.rate}'
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