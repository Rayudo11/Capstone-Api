const mysql = require('mysql');

require('dotenv').config();



const {PORT,
    HOST,
    USER,
    PASSWORD,
    DATABASE
} = process.env;


const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
})

module.exports = connection;