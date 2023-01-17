const db = require('../mysql/mysqlConnection');
const database = "game";
class Game{
    constructor(game_name, expected_duration, prize, created_by, questions){
        this.game_name = game_name;
        this.expected_duration = expected_duration; 
        this.prize = prize;
        this.created_by = created_by;
        this.questions = questions;
    }

    save(){
        let sql = 
        `INSERT INTO ${database}(
            game_name,
            expected_duration,
            prize,
            created_by,
            questions
        )
        values(
            '${this.game_name}',
             ${this.expected_duration},
            '${this.prize}',
             ${this.created_by},
            '${JSON.stringify(this.questions)}'
        );`;
        return db.execute(sql); 
    }

    static findAll(){
        let sql = `SELECT * FROM ${database}`;
        return db.execute(sql);
    }

    static findById(id){
        let sql = `SELECT * FROM ${database} WHERE game_id = ${id}`;
        // console.log(sql);
        return db.execute(sql);
    }
}

// // QUESTION CLASS
// class Question{
//     constructor(question, optionSet, answer){
//         this.question = question;
//         this.optionSet = [];
//         optionSet.forEach(option => {
//             this.optionSet.push(new Option(option.key, option.value));
//         });
//         this.answer = answer
//     }
//     addOption(key, value){
//         let option = new Option(key, value);
//         this.optionSet.push(option);
//     }
// }

// // OPTION CLASS
// class Option{
//     constructor(key, val){
//         this.key = key;
//         this.val = val
//     }
//     setValue(val){
//         this.val = val;
//     }
// }

module.exports = Game;