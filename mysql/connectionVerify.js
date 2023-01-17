let MySqli = require('mysqli');
const conn = new MySqli({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
  });

  let db = conn.emit(false,'')

// module.exports = conn; 
module.exports = {
  database:db
}