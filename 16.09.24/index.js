import * as http from 'node:http'
import * as fs from 'node:fs'

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Strona Główna`);
    } else if (url === "/json") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let json_file = {"file": "json"};
        json_file = JSON.stringify(json_file);
        res.end(json_file);
    } else if (url === "/html") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        let html = `
            <html lang="en">
            <head>
            <title>HTML</title>
            </head>
            <body>
            <h1>Dokument html generowany w kodzie</h1>
            </body>
            </html>`
        res.end(html);
    } else if (url === "/html-file") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile("index.html", (err, data) => {
            if (err) throw err;
            else {
                res.end(data);
            }
        });
    }
});

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`);
})