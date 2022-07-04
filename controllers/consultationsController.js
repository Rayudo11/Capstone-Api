const pool = require('../sql/connection')

const list = (req,res) => {
    console.log('our GET /aws route');
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

const add =() => {}

module.exports = {
    list,
    show,
    add,
}