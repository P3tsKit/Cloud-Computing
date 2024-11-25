const express = require('express');
const routes = require('./REST API/routes'); // Import routes.js dengan benar
const app = express();
const port = 9000;

// Gunakan middleware untuk rute-rute yang sudah didefinisikan di routes.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
