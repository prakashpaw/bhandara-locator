const express = require('express')
const router = express.Router()
const { register, login, getAdmins } = require('../controllers/auth.controller')
const { protect } = require('../middleware/auth.middleware')

router.post('/register', protect, register)  // 🔒 only logged-in admins can create new admins
router.post('/login', login)
router.get('/users', protect, getAdmins)     // 🔒 only logged-in admins can view admins

module.exports = router