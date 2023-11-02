const express = require('express');
const next = require('next');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
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
    return handle(req, res);
  });

  const PORT = process.env.PORT || 443;

  const options = {
    key: fs.readFileSync('portalize.io-key.pem'),
    cert: fs.readFileSync('portalize.io-chain.pem'),
    passphrase: "Paff!2023"
  };

  // Create an HTTP/2 server with SPDY
  spdy
    .createServer(options, server)
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`HTTP/2 Server is running on https://portalize.io`);
    });
});