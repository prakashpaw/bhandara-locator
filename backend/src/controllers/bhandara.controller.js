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

const deleteBhandara = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM bhandaras WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bhandara not found' })
    }
    res.json({ message: 'Deleted successfully', id })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

const updateBhandara = async (req, res) => {
  const { id } = req.params
  const { name, description, date, time, address, contact, lat, lng } = req.body
  try {
    const result = await pool.query(
      `UPDATE bhandaras SET name=$1, description=$2, date=$3, time=$4,
       address=$5, contact=$6, lat=$7, lng=$8 WHERE id=$9 RETURNING *`,
      [name, description, date, time, address, contact, lat, lng, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getAllBhandaras, addBhandara, deleteBhandara, updateBhandara }
