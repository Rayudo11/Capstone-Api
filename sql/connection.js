require('dotenv').config();
const mysql = require('mysql');




const {
    HOST,
    USER,
    PASSWORD,
    DATABASE
} = process.env;


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

module.exports = pool;