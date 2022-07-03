const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = require('./sql/connection')
const users = require('./routers/users')
const Pool = require('mysql/lib/Pool')
const callIn = require("./controllers/login");
const PORT = process.env.PORT || 3001;

app.use(express.json());


//Create Connection//
let pool = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,

    host: "capstonedb2.ci8hykfduhvx.us-east-2.rds.amazonaws.com",
    user: 'admin',
    password: 'rayudo11',
    database: 'capstone',
    debug: false
})



//Get All Clients// 
// app.get("/clients", callIn.list);
app.get('/clients', (req,res) => {
    pool.query('SELECT * FROM clients;' , function( err, rows) {
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
})


//GET single client by customer Id //
// app.get('/clients/:id', callIn.show);
app.get('/clients/:id', (req,res) => {
    let sql = `SELECT * FROM clients WHERE customer_id = ${req.params.id}`;
    pool.query(sql , function( err, results) {
        if(err){
            return res.json({'error': true,
             'message': 'Error occured: ' + err
            })
        }else {
            res.json(results)
            console.log('here are the clients')
        }
    })
})

//Add Client//
// app.get('/addclient',callIn.add);
 app.get('/addclient', (req,res) => {
    let post = {customer_id:'6', customer_name: 'Lea', email:'Lea200@gmail.com', city: 'England', state: 'No', zip_code: '52341', password: 'Leaisawesome1'};
    let sql = 'INSERT INTO clients SET ?';
   pool.query(sql, post, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log('new client added...')
     }
   })
 })

//Get All consultations//
app.get('/consultations/', (req,res) => {
    let { id } = req.params;
    let sql = `SElECT * FROM consultations;`;
    pool.query( sql , function( err, rows) {
        if(err){
            return res.json({'error': true,
             'message': 'Error occured: ' + err
            })
        }else {
            res.json(rows)
            console.log('here are the clients')
        }
    })
})

//Get consultation by customer id//
app.get('/consultations/:id', (req,res) => {
    
    let sql = `SELECT * FROM consultations WHERE customer_id = ${req.params.id}`;
    pool.query( sql , function( err, rows) {
        if(err){
            return res.json({'error': true,
             'message': 'Error occured: ' + err
            })
        }else {
            res.json(rows)
            console.log('consultation found ...')
        }
    })
})

//add consultation as client//
app.post('/addconsultation', (req,res) => {
    console.log(req.body);
   let post = (req.body)
   let sql = 'INSERT INTO consultations SET ?';
  pool.query(sql, post, (err, rows) => {
    if(err){
        return res.json({'error': true,
    'message': 'Error occured ' + err
          })
    }else{
        res.json(rows)
        console.log('new consultation added...')
    }
  })
})

//Delete consultation using customer id//
app.delete('/deleteconsultation/:id', (req,res) => {
    let sql = `DELETE FROM consultations WHERE consultation_id = ${req.params.id}`;
   pool.query(sql, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log(' consultation Deleted...')
     }
   })
})

//Update consultation details//
app.put('/updateconsultation/:id', (req,res) => {
    let post = (req.body);
    let sql = `UPDATE consultations SET attendees = ? WHERE consultation_id = ${req.params.id}`;
   pool.query(sql, post, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log(req.body)
         console.log(' consultation Updated...')
     }
   })
})

//Get all invoices//
app.get('/invoices', (req,res) => {
     let sql = 'SELECT * FROM invoice;'
   pool.query(sql, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log(' Here are the invoices...')
     }
   })
})

//Get invoice by customer id//
app.get('/updateinvoice/:id', (req,res) => {
    let taxEx = 'No'
    let payment = 'Crebit'
    let sql = `UPDATE invoice SET tax_exempt = '${taxEx}', payment_type = '${payment}' WHERE customer_id = ${req.params.id}`;
   pool.query(sql, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log(' invoice updated...')
     }
   })
})

//Cancel Transaction using invoice number//
app.get('/deleteinvoice/:id', (req,res) => {
    let sql = `DELETE FROM invoice WHERE invoice_number = '${req.params.id}'`;
   pool.query(sql, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log(' invoice deleted...')
     }
   })
})

//Add invoice using customer id//
app.get('/addinvoice', (req,res) => {
    let post = {invoice_number:'103', customer_id: '3', total:'5000', tax_exempt: 'Yes', payment_type: 'Credit'};
    let sql = 'INSERT INTO invoice SET ?';
   pool.query(sql, post, (err, rows) => {
     if(err){
         return res.json({'error': true,
     'message': 'Error occured ' + err
           })
     }else{
         res.json(rows)
         console.log('new invoice added...')
     }
   })
 })


//App Listens//
app.listen(PORT, ()=>{
    console.log(`listening on port  ${PORT}`)
});