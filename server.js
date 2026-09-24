const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DOC_DIR = __dirname;
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.md': 'text/markdown; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(reqUrl.pathname);

  // Default route to Documentation_Web/index.html
  if (pathname === '/' || pathname === '/index.html') {
    pathname = '/Documentation_Web/index.html';
  } else if (!pathname.startsWith('/Documentation_Web/') && !pathname.startsWith('/tasks/') && !pathname.startsWith('/pending_tasks.md')) {
    // Check if file exists directly inside Documentation_Web
    if (fs.existsSync(path.join(DOC_DIR, pathname))) {
      pathname = '/Documentation_Web' + pathname;
    }
  }

  // Resolve target file safely within workspace root
  let targetPath;
  if (pathname.startsWith('/Documentation_Web/')) {
    targetPath = path.join(DOC_DIR, pathname.replace(/^\/Documentation_Web\//, ''));
  } else {
    targetPath = path.join(ROOT_DIR, pathname.replace(/^\//, ''));
  }

  // Ensure security against directory traversal outside workspace
  const resolved = path.resolve(targetPath);
  if (!resolved.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(resolved, (err, stats) => {
    if (err || !stats.isFile()) {
      // Check if user requested a directory containing index.html
      if (stats && stats.isDirectory()) {
        const potentialIndex = path.join(resolved, 'index.html');
        if (fs.existsSync(potentialIndex)) {
          serveFile(potentialIndex, res);
          return;
        }
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${pathname}`);
      return;
    }

    serveFile(resolved, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`500 Internal Server Error: ${err.code}`);
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` EDEL Elevator Knowledgebase Portal Server`);
  console.log(` Local URL:   http://localhost:${PORT}`);
  console.log(` Network URL: http://127.0.0.1:${PORT}`);
  console.log(` Serving:     ${DOC_DIR}`);
  console.log(`=======================================================`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    const nextPort = Number(PORT) + 1;
    console.log(`Port ${PORT} in use, trying ${nextPort}...`);
    server.listen(nextPort, '0.0.0.0');
  } else {
    console.error('Server error:', e);
  }
});
