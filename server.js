'use strict'
// server.js — Passenger-compatible Next.js startup (used in production on Plesk)
// Plesk sets process.env.PORT; this file is the Application Startup File in the panel.

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev  = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const app    = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on port ${port}`)
  })

  // Passenger sends SIGTERM on restart/shutdown — close gracefully
  process.on('SIGTERM', () => {
    server.close(() => process.exit(0))
  })
})
