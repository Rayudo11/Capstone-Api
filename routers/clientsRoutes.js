const express = require('express');
const router = express.Router()
const pool = require('../sql/connection')
const clientsController = require('../controllers/clientsController')

router.get('/clients', clientsController.list)

router.get("/clients/:id", clientsController.show );

//Add Client//
router.post('/addclient', clientsController.add)

router.get('/invoices', (req,res) => {
    console.log('our GET /aws route');
    pool.query(
        'SELECT * FROM invoice', (error, results) => {
            if(error){
                console.log("error", error);
                res.status(500)
            } else {
                res.json(results)
            }
        }
    )
})




module.exports = router
