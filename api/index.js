import express from 'express';
import path from 'path';

const app = express();

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(process.cwd(), 'public'))); */

/* app.get('/listarPrecios', (req, res) => {
  res.sendFile(path.resolve('api/content/get-listar-precios.html'));
}); */

app.get('/', (req, res) => res.send('Express on Vercel'));

app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;
