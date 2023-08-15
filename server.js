const https = require('https')
const { parse } = require('url')
const fs = require('fs')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'portalize.io'
const port = 443
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  https.createServer({
	cert:fs.readFileSync('crt.pem'),
	key:fs.readFileSync('key.pem'),
	passphrase: "Paff!2023"
},async (req, res) => {
  try {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/api/*') {
      await app.render(req, res, parsedUrl, query)
    } else {
      await handle(req, res, parsedUrl)
    }
  } catch (err) {
    console.error('Error occurred handling', req.url, err)
    res.statusCode = 500
    res.end('internal server error')
  }
}).listen(port, (err) => {
  if (err) throw err;
  console.log("> Server started on https://localhost:" + port);
})
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
})