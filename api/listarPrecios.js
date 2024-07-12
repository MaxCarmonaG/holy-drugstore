import fs from 'fs';
import path from 'path';

export function GET() {
  let usersPath = path.join(process.cwd(), '/api/content/get-listar-precios.html');
  let file = fs.readFileSync(usersPath);
  return new Response(file);
}
