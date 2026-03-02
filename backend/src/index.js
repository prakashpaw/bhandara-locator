const express = require('express')
const cors = require('cors')
require('dotenv').config()

const bhandaraRoutes = require('./routes/bhandara.routes')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/bhandaras', bhandaraRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running ✅' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})