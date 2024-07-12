import express from 'express';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

/* app.get('/listarPrecios', (req, res) => {
  res.sendFile(path.resolve('api/content/get-listar-precios.html'));
}); */

export default app;
