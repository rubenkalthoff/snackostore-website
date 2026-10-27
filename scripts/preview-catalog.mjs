// Optionaler lokaler Proxy für öffentlich freigegebene Produkte, ohne Zugangsschlüssel.
// Zuerst npm run dev starten, dann node scripts/preview-catalog.mjs.
import { createServer } from 'node:http';
const port = 4323;
createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405); response.end(); return;
  }
  const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
  const upstream = pathname === '/api/products'
    ? 'https://snackostore.de/api/products'
    : new URL(request.url, 'http://127.0.0.1:4321').href;
  try {
    const result = await fetch(upstream, { signal: AbortSignal.timeout(20000), redirect: 'manual' });
    response.statusCode = result.status;
    for (const name of ['content-type', 'location']) {
      const value = result.headers.get(name); if (value) response.setHeader(name, value);
    }
    response.setHeader('Cache-Control', 'no-store');
    response.end(Buffer.from(await result.arrayBuffer()));
  } catch {
    response.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Lokale Vorschau oder öffentlicher Produktkatalog nicht erreichbar.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Produktvorschau: http://127.0.0.1:${port}`));
