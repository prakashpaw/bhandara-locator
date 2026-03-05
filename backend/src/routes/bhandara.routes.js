const express = require('express')
const router = express.Router()
const { getAllBhandaras, addBhandara } = require('../controllers/bhandara.controller')
const { protect } = require('../middleware/auth.middleware')

router.get('/', getAllBhandaras)
router.post('/', protect, addBhandara)  // 🔒 protected

module.exports = router