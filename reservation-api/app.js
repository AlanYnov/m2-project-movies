const express = require('express');
const app = express();

// Import your API routes
const api = require('./api/api');
app.use(api);

const port = 3000;
const host = 'localhost';

// Start the server and log the listening address
app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});