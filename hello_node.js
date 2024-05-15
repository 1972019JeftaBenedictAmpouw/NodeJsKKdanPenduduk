const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (req.method === 'GET') {
        if (pathname === '/' || pathname === '/index.html') {
            renderHTML(res, 'index.html');
        }
    } else if (req.method === 'POST') {
        if (pathname === '/tambah-penduduk') {
            handleTambahPenduduk(req, res);
        }
    }
});
function renderHTML(res, filePath) {
    const htmlPath = path.join(__dirname, filePath);
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}
const querystring = require('querystring');
function handleTambahPenduduk(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        const data = querystring.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    });
}
server.listen(8000);
