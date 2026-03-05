const express = require('express')
const cors = require('cors')
require('dotenv').config()

const bhandaraRoutes = require('./routes/bhandara.routes')
const authRoutes = require('./routes/auth.routes')
const { httpRequestCounter, httpRequestDuration, register } = require('./metrics')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Metrics middleware
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer()
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    })
    end({
      method: req.method,
      route: req.path,
      status: res.statusCode
    })
  })
  next()
})

// Routes
app.use('/api/bhandaras', bhandaraRoutes)
app.use('/api/auth', authRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running ✅' })
})

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})