const next = require('next')
const express = require('express')
const spdy = require('spdy')
const fs = require('fs')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'portalize.io'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// create your own certificate with openssl for development
const options = {
  key: fs.readFileSync('portalize.io-key.pem'),
    cert: fs.readFileSync('portalize.io-chain.pem'),
    passphrase: "Paff!2023"
}


app.prepare().then(() => {
  // create the express app
  

  // start the HTTP/2 server with express
  spdy.createServer(options, async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
  
      if (pathname === '/api/*') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        await app.render(req, res, parsedUrl, query)
      } else if (pathname === 'WebGL/*') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        await app.render(req, res, parsedUrl, query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, error => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log(`HTTP/2 server listening on port: ${port}`)
    }
  })
})