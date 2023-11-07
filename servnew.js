const express = require('express');
const next = require('next');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');

const port = 3000
const hostname = `localhost`
const dev = process.env.NODE_ENV !== 'production';
const app = next({port, hostname, dev })
const handle = app.getRequestHandler();


app.prepare().then(() => {

  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      const server = express();

  // Define custom Express routes here, e.g.,
  // server.get('/custom-route', (req, res) => {
  //   return app.render(req, res, '/your-next-page', req.query);
  // });

        // Serve static files from the 'uploads' directory
        const uploadsDir = path.join(__dirname, 'uploads');
        server.use('/uploads', express.static(uploadsDir));


      // Default Next.js route handling
      server.all('*', (req, res) => {
        return handle(req, res, parsedUrl);
      });
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
  
  

  

  const PORT = process.env.PORT || 3000;

  const options = {
    key: fs.readFileSync('portalize.io-key.pem'),
    cert: fs.readFileSync('portalize.io-chain.pem'),
    passphrase: "Paff!2023"
  };

  // Create an HTTP/2 server with SPDY
  // spdy
  //   .createServer(options, server)
    // listen(PORT, (err) => {
    //   if (err) throw err;
    //   console.log(`HTTP/2 Server is running on https://portalize.io`);
    // });
})