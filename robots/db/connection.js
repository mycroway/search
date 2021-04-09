require('dotenv').config()

const connection = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mycrowaySearch'
  }
});

module.exports = connection;