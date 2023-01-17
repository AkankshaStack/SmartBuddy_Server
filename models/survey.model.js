const db = require('../mysql/mysqlConnection');
class Survey{
    constructor(IP, geo_location, store, name,RAM){
        this.IP = IP;
        this.geo_location= geo_location;
        this.store = store;
        this.user_id = user_id;
        this.RAM = RAM;
    }

    save(){
        let date = new Date();
        let yyyy = date.getYear();
        let mm = date.getMonth();
        let dd = date.getDay();

        let created_date = `${yyyy}-${mm}-${dd}`;
        let sql= `
        INSERT INTO device(
            MAC,
            IP,
            geo_location,
            store,
            user_id,
            RAM
        )
        values(
            '${this.MAC}',
            '${this.IP}',
            '${this.geo_location}',
            '${this.store}',
            '${this.user_id}',
            '${this.RAM}'
        )
        `;

        const res = db.execute(sql);
        console.log(res);
        return res
    }
}

module.exports = Survey;