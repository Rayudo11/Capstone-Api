const mysql = require('mysql')


const connection = mysql.createConnection({
    host: "capstonedb2.ci8hykfduhvx.us-east-2.rds.amazonaws.com",
    user: 'admin',
    password: 'rayudo11',
    database: 'capstone'
})

module.export = connection;