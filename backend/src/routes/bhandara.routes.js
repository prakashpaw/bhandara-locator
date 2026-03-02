const express = require('express')
const router = express.Router()
const { getAllBhandaras, addBhandara } = require('../controllers/bhandara.controller')

router.get('/', getAllBhandaras)
router.post('/', addBhandara)

module.exports = router