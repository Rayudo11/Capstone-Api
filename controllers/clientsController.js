const pool = require('../sql/connection')

const list = (req,res) => {
    console.log('our GET /aws route');
    pool.query(
        'SELECT * FROM clients', (error, results) => {
            if(error){
                console.log("error", error);
                res.status(500).json(er)
            } else {
                res.json(results)
            }
        }
    )
}

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
  }

const add = (req,res) => {
    console.log(req.body)
    res.send('working...')
    // let sql = 'INSERT INTO clients SET ?';
    //     pool.query(sql, post, (err, rows) => {
    //         if(err){
    //             return res.json({'error': true,
    //         'message': 'Error occured ' + err
    //             })
    //         }else{
    //             res.json(rows)
    //             console.log('new client added...')
    //         }
    //     })
    }

module.exports = {
    list,
    show,
    add,
}