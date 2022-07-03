const connection = require("../sql/connection");

const list = (req,res) => {
    connection.query('SELECT * FROM clients;' , function( err, rows) {
        if(err){
            return res.json({'error': true,
             'message': 'Error occured: ' + err
            })
        }else {
            res.json(rows)
            console.log(req.body)
            console.log('Here are the clients')
        }
    })
};

const show = (req,res) => {
    let sql = `SELECT * FROM clients WHERE customer_id = ${req.params.id}`;
    connection.query(sql , function( err, results) {
        if(err){
            return res.json({'error': true,
             'message': 'Error occured: ' + err
            })
        }else {
            res.json(results)
            console.log('here are the clients')
        }
    })
}

const add = (req,res) => {
    let post = {customer_id:'6', customer_name: 'Lea', email:'Lea200@gmail.com', city: 'England', state: 'No', zip_code: '52341', password: 'Leaisawesome1'};
    let sql = 'INSERT INTO clients SET ?';
   connection.query(sql, post, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log('new client added...')
     }
   })
}

module.exports = {
    list,
    show,
    add,
}