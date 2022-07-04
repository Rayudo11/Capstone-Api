const express = require("express");
const app = express();
const cors = require('cors')
const pool = require("./sql/connection");

const clients = require("./routers/clientsRoutes");
const consultations = require("./routers/consultationsRoutes");

const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use(clients)
app.use(consultations)

app.get("/", (req, res) => {
  res.send("my default page");
});

//add consultation as client//
app.post("/addconsultation", (req, res) => {
  console.log(req.body);
  let post = req.body;
  let sql = "INSERT INTO consultations SET ?";
  pool.query(sql, post, (err, rows) => {
    if (err) {
      return res.json({ error: true, message: "Error occured " + err });
    } else {
      res.json(rows);
      console.log("new consultation added...");
    }
  });
});

//Delete consultation using customer id//
app.delete("/deleteconsultation/:id", (req, res) => {
  let sql = `DELETE FROM consultations WHERE consultation_id = ${req.params.id}`;
  pool.query(sql, (err, rows) => {
    if (err) {
      return res.json({ error: true, message: "Error occured " + err });
    } else {
      res.json(rows);
      console.log(" consultation Deleted...");
    }
  });
});

//Update consultation details//
app.put("/updateconsultation/:id", (req, res) => {
  let post = req.body;
  let sql = `UPDATE consultations SET attendees = ? WHERE consultation_id = ${req.params.id}`;
  pool.query(sql, post, (err, rows) => {
    if (err) {
      return res.json({ error: true, message: "Error occured " + err });
    } else {
      res.json(rows);
      console.log(req.body);
      console.log(" consultation Updated...");
    }
  });
});

//Get all invoices//
app.get("/invoices", (req, res) => {
  let sql = "SELECT * FROM invoice;";
  pool.query(sql, (err, rows) => {
    if (err) {
      return res.json({ error: true, message: "Error occured " + err });
    } else {
      res.json(rows);
      console.log(" Here are the invoices...");
    }
  });
});

//Get invoice by customer id//
app.get("/updateinvoice/:id", (req, res) => {
  let taxEx = "No";
  let payment = "Crebit";
  let sql = `UPDATE invoice SET tax_exempt = '${taxEx}', payment_type = '${payment}' WHERE customer_id = ${req.params.id}`;
  pool.query(sql, (err, rows) => {
    if (err) {
      return res.json({ error: true, message: "Error occured " + err });
    } else {
      res.json(rows);
      console.log(" invoice updated...");
    }
  });
});

//Cancel Transaction using invoice number//
app.get("/deleteinvoice/:id", (req, res) => {
  let sql = `DELETE FROM invoice WHERE invoice_number = '${req.params.id}'`;
  pool.query(sql, (err, rows) => {
    if (err) {
      return res.json({ error: true, message: "Error occured " + err });
    } else {
      res.json(rows);
      console.log(" invoice deleted...");
    }
  });
});

//Add invoice using customer id//
app.get("/addinvoice", (req, res) => {
  let post = {
    invoice_number: "103",
    customer_id: "3",
    total: "5000",
    tax_exempt: "Yes",
    payment_type: "Credit",
  };
  let sql = "INSERT INTO invoice SET ?";
  pool.query(sql, post, (err, rows) => {
    if (err) {
      return res.json({ error: true, message: "Error occured " + err });
    } else {
      res.json(rows);
      console.log("new invoice added...");
    }
  });
});

//App Listens//
app.listen(PORT, () => {
  console.log(`listening on port  ${PORT}`);
});
