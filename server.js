'use strict'

// Log immediately — confirms the file is reached and shows what Passenger actually injected
console.log('server.js starting, PORT=' + process.env.PORT + ' NODE_ENV=' + process.env.NODE_ENV)

// Passenger sometimes doesn't inject Plesk env vars before the process starts;
// force production mode so Next.js looks for the built .next/ output, not the dev server
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

// Catch anything that escapes the normal promise chain and make it visible in Passenger logs
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason)
  process.exit(1)
})

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev  = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const app    = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on port ' + port)
    })

    // Passenger sends SIGTERM on restart/shutdown — close gracefully
    process.on('SIGTERM', () => {
      server.close(() => process.exit(0))
    })
  })
  .catch((err) => {
    // Surface the real reason Next.js failed to start — visible in Passenger's stderr log
    console.error('[server.js] app.prepare() failed:', err)
    process.exit(1)
  })
