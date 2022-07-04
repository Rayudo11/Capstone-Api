const express = require('express');
const router = express.Router()
const pool = require('../sql/connection')
const consultationsController = require('../controllers/consultationsController')

router.get('/consultations', consultationsController.list)

router.get("/consultations/:id", consultationsController.show);

module.exports = router