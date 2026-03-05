const client = require('prom-client')

// Collect default metrics (CPU, memory, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({ timeout: 5000 })

// Custom metrics
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
})

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5]
})

const register = client.register

module.exports = { httpRequestCounter, httpRequestDuration, register }