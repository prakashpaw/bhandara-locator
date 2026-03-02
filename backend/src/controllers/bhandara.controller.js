const pool = require('../db/db')

// GET all bhandaras
const getAllBhandaras = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bhandaras ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Server error' })
  }
}

// POST add new bhandara
const addBhandara = async (req, res) => {
  const { name, description, date, time, address, contact, lat, lng } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO bhandaras (name, description, date, time, address, contact, lat, lng)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, description, date, time, address, contact, lat, lng]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getAllBhandaras, addBhandara }