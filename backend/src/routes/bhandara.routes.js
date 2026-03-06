const express = require('express')
const router = express.Router()
const { getAllBhandaras, addBhandara, deleteBhandara } = require('../controllers/bhandara.controller')
const { protect } = require('../middleware/auth.middleware')

router.get('/', getAllBhandaras)
router.post('/', protect, addBhandara)
router.delete('/:id', protect, deleteBhandara)
router.put('/:id', protect, updateBhandara)

module.exports = router