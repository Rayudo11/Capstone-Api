const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./sql/connection");

const clients = require("./routers/clientsRoutes");
const consultations = require("./routers/consultationsRoutes");
// const invoice = require("./routers/invoiceRoutes");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(clients);
app.use(consultations);
// app.use(invoice)

app.get("/", (req, res) => {
  res.send("Bryan Here");
});

// app.post("/addclient", (req,res) =>{
//   const clientEmail = req.body.email;
//   const clientPassword = req.body.password;

// })




//App Listens//
app.listen(PORT, () => {
  console.log(`listening on port  ${PORT}`);
});
