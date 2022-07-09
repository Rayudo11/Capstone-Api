// const pool = require('../sql/connection');

// const list = (req, res) => {
//     let sql = "SELECT * FROM invoice;";
//     pool.query(sql, (err, rows) => {
//       if (err) {
//         return res.json({ error: true, message: "Error occured " + err });
//       } else {
//         res.json(rows);
//         console.log(" Here are the invoices...");
//       }
//     });
// }

// const show = (req, res) => {
//   let taxEx = "No";
//   let payment = "Crebit";
//   let sql = `SELECT * FROM invoices WHERE customer_id = ${req.params.id}`;
//   pool.query(sql, (err, rows) => {
//     if (err) {
//       return res.json({ error: true, message: "Error occured " + err });
//     } else {
//       res.json(rows);
//       console.log(" invoice updated...");
//     }
//   });
// };

// const add = (req, res) => {
//     console.log('working')
    // res.json('working...')
    // pool.query(
    //   'INSERT INTO capstone.invoice (invoice_number,customer_id,total,tax_exempt,payment_type) VALUES (?,?,?,?,?)',
    //   [
    //     req.body.invoice_number,
    //     null,
    //     req.body.total,
    //     req.body.tax_exempt,
    //     req.body.payment_type,
    //   ],
    //   function (err,invoice) {
    //         if (err) error;
            
    //     }
    // )
// };

//Add invoice using customer id//
// app.get("/addinvoice", (req, res) => {
//   let post = {
//     invoice_number: "103",
//     customer_id: "3",
//     total: "5000",
//     tax_exempt: "Yes",
//     payment_type: "Credit",
//   };
//   let sql = "INSERT INTO invoice SET ?";
//   pool.query(sql, post, (err, rows) => {
//     if (err) {
//       return res.json({ error: true, message: "Error occured " + err });
//     } else {
//       res.json(rows);
//       console.log("new invoice added...");
//     }
//   });
// });

//Cancel Transaction using invoice number//
// app.get("/deleteinvoice/:id", (req, res) => {
//   let sql = `DELETE FROM invoice WHERE invoice_number = '${req.params.id}'`;
//   pool.query(sql, (err, rows) => {
//     if (err) {
//       return res.json({ error: true, message: "Error occured " + err });
//     } else {
//       res.json(rows);
//       console.log(" invoice deleted...");
//     }
//   });
// });


// module.exports = {
//     list,
//     show,
//     add,
// }