const express = require('express');
const next = require('next');
const spdy = require('spdy');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Define custom routes or middleware here (if needed)

    // Serve static files from the 'uploads' directory
    const uploadsDir = path.join(__dirname, 'uploads');
    server.use('/uploads', express.static(uploadsDir));

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const options = {
    key: fs.readFileSync('portalize.io-key.pem'),
    cert: fs.readFileSync('portalize.io-chain.pem'),
    passphrase: "Paff!2023"
  };

  // Create an HTTP/2 server using 'spdy' on port 443 (HTTPS)
  spdy.createServer(options, server).listen(443, 'portalize.io', (err) => {
    if (err) throw err;
    console.log('Server is running on https://portalize.io');
  });
});
