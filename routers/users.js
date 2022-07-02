const express = require('express');
const router = express. Router()


router.get('aws', (req,res) => {
    console.log('our GET /aws route');
    connection.query(
        'SELECT * FROM clients', (error, results) => {
            if(error){
                console.log("error", error);
                res.status(500)
            } else {
                res.json(results)
            }
        }
    )
})

router.get('aws', (req,res) => {
    console.log('our GET /aws route');
    connection.query(
        'SELECT * FROM consultations', (error, results) => {
            if(error){
                console.log("error", error);
                res.status(500)
            } else {
                res.json(results)
            }
        }
    )
})

router.get('aws', (req,res) => {
    console.log('our GET /aws route');
    connection.query(
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
