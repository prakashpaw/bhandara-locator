const pool = require('../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const hashed = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, role',
      [email, hashed]
    )
    res.status(201).json({ message: 'User created', user: result.rows[0] })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: 'Server error' })
  }
}

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.json({ token, email: user.email, role: user.role })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { register, login }