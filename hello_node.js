const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (req.method === 'GET') {
        if (pathname === '/' || pathname === '/index.html') {
            renderHTML(res, 'index.html');
        } else {
            handleNotFound(res);
        }
    } else if (req.method === 'POST') {
        if (pathname === '/tambah-penduduk') {
            handleTambahPenduduk(req, res);
        } else {
            handleNotFound(res);
        }
    } else {
        handleNotFound(res);
    }
});

function renderHTML(res, filePath) {
    const htmlPath = path.join(__dirname, filePath);
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Page Not Found');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
}

function handleTambahPenduduk(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { namaPenduduk, nomorKeluarga } = querystring.parse(body);
        const data = { nama: namaPenduduk, keluarga: nomorKeluarga };

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    });
}

function handleNotFound(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page Not Found');
}
server.listen(8000);
