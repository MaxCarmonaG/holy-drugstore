const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

/* app.get('/listarPrecios', (req, res) => {
  res.sendFile(path.resolve('api/content/get-listar-precios.html'));
}); */

module.exports = app;
