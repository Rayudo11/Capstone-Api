const pool = require('../sql/connection')

//Select All consultations//
const list = (req,res) => {
    pool.query(
        'SELECT * FROM consultations', (error, results) => {
            if(error){
                console.log("error", error);
                res.status(500)
            } else {
                res.json(results)
            }
        }
    )
}

//get consultation using customer_id//
const show = (req, res) => {
    let sql = `SELECT * FROM consultations WHERE customer_id = ${req.params.id}`;
    pool.query(sql, function (err, rows) {
      if (err) {
        return res.json({ error: true, message: "Error occured: " + err });
      } else {
        res.json(rows);
        console.log("consultation found ...");
      }
    });
}

//Add consultation//
const add =(req, res) => {
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
}

//Delete consultation using consultation_id //
const remove =(req, res) => {
    let sql = `DELETE FROM consultations WHERE consultation_id = ${req.params.id}`;
    pool.query(sql, (err, rows) => {
      if (err) {
        return res.json({ error: true, message: "Error occured " + err });
      } else {
        res.json(rows);
        console.log(" consultation Deleted...");
      }
    });
}

//update consultation//DOESN'T work (Error occured Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '?, transportation = ?, attendees = ? WHERE consultation_id = 1001' at line 1")
const change = (req, res) => {
    pool.query(
     `UPDATE consultations SET budget = ?, location = ?, transportation = ?, attendees = ? WHERE consultation_id = ${req.params.id}`,
     [
      req.body.budget,
      req.body.location,
      req.body.transportation,
      req.body.attendees
     ],
      function (err,consultation) {
        if (err) console.log({err: err});
      }
    
    );
}

module.exports = {
    list,
    show,
    add,
    remove,
    change
}