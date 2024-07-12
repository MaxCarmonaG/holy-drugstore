import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/pedido/busquedaitems', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/content/get-busqueda-items.html'));
});

app.post('/pedido/agregaitem', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/content/post-agrega-item.html'));
});

app.get('/pedido/agregaitem', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/content/get-agrega-item.html'));
});

app.get('/pedido/listarlaboratorios', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/content/get-listar-laboratorios.html'));
});

app.get('/pedido/itemslaboratorio/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/content/get-busqueda-items.html'));
});

app.get('/pedido/editaitem/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/api/content/get-edita-item.html'));
});

app.get('/consultas/pedidos/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/api/content/get-consultas-pedidos.html'));
});

app.get('/consultas/facturas/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/content/get-consultas-facturas.html'));
});

/* app.get('/listarPrecios', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/api/content/get-listar-precios.html'));
}); */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
