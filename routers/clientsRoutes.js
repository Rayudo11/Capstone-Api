const express = require('express');
const router = express.Router()
const pool = require('../sql/connection')
const clientsController = require('../controllers/clientsController')

router.get('/clients', clientsController.checkJwt, clientsController.list);

router.get("/clients/:id", clientsController.show );

router.post('/addclient', clientsController.add);

router.post('/login', clientsController.login);





module.exports = router
