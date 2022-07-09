const pool = require("../sql/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const list = (req, res) => {
  console.log("our GET /aws route");
  console.log(req);
  pool.query("SELECT * FROM clients", (error, results) => {
    if (error) {
      console.log("error", error);
      res.status(500).json(er);
    } else {
      res.json(results);
    }
  });
};

const show = (req, res) => {
  let sql = `SELECT * FROM clients WHERE customer_id = ${req.params.id}`;
  pool.query(sql, function (err, results) {
    if (err) {
      return res.json({ error: true, message: "Error occured: " + err });
    } else {
      res.json(results);
      console.log("here are the clients");
    }
  });
};

const add = (req, res) => {
  console.log(req.body);
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return res.status(500).json({ err: err });
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Store hash in your password DB.
      pool.query(
        "INSERT INTO clients (customer_id, customer_name, email, city, state, zip_code, password) VALUES (?,?,?,?,?,?,?)",
        [
          null,
          req.body.customer_name,
          req.body.email,
          req.body.city,
          req.body.state,
          req.body.zip_code,
          hash,
        ],
        function (err, results) {
          if (err) return res.status(400).json({ err: err });
          return res.json(results);
        }
      );
    });
  });
};

const login = (req, res) => {
  console.log("login");
  let sql = `SELECT * FROM clients WHERE email = ?`;
  pool.query(sql, [req.body.user], (err, rows) => {
    if (rows.length === 0) {
      return res.status(404).json("That user does not exist");
    }
    bcrypt.compare(req.body.password, rows[0].password, function (err, result) {
      if (err)
        return res.status(500).json("There was an internal server error");
      // result == true
      if (!result) {
        console.log("no match");
        return res.status(404).json("password does not match");
      }
      if (result) {
        console.log("password is a match");
        let userID = rows[0].customer_id;
        console.log("rows", rows);
        const unsignedToken = {
          customer_id: rows[0].customer_id,
          customer_name: rows[0].customer_name,
        };
        console.log(unsignedToken);
        const token = jwt.sign(unsignedToken, process.env.SECRET_KEY, {
          expiresIn: 600 * 100 * 100 * 10,
        });
        res.status(200).json({ userID, token });
      }
    });
  });
};

const checkJwt = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(404).json("You are not authorized!");
  let bearer = req.headers.authorization.split(" ");
  let token = bearer[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    console.log(decoded);
    (req.customer_id = decoded.customer_id),
      (req.customer_name = decoded.customer_name);
    next();
  });
};

module.exports = {
  list,
  show,
  add,
  login,
  checkJwt,
};
