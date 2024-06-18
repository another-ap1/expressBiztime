/** Database setup for BizTime. */

// const { Client } = require("pg");

// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   database: 'biztime',
//   user: 'postgres',
//   password: 'postgres'
// })
// client.connect((err) => {
//   if (err) {
//     console.error('connection error', err.stack);
//   } else {
//     console.log('connected');
//   }
// })

// module.exports = client;

/** Database setup for users. */

const { Client } = require("pg");

DB_URI = "postgresql:///biztime";

let db = new Client({
  host: 'localhost',
  port: 5432,
  database: 'biztime',
  user: 'postgres',
  password: 'postgres'
});

db.connect();

module.exports = db;

