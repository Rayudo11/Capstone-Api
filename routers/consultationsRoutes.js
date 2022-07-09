const express = require('express');
const router = express.Router()
const pool = require('../sql/connection')
const consultationsController = require('../controllers/consultationsController')
const {checkJwt} = require("../controllers/clientsController")

router.get('/consultations', consultationsController.list)

router.get("/consultations/:id", consultationsController.show);

router.post("/addconsultation", consultationsController.add);

router.delete("/removeconsultation/:id", consultationsController.remove);

router.put("/updateconsultation/:id", consultationsController.change);

module.exports = router