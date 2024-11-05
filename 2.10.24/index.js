import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import mime from 'mime'

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
    else if (url.startsWith("/get_params")) {
        const params = new URLSearchParams(url.split("?")[1]);
        console.log(params);

        const fpath = path.join("C:/Users/pc/Desktop/paw/PAW_24_25/2.10.24", `params_${new Date().getTime()}.json`);
        fs.writeFile(fpath, JSON.stringify(params), (err, data) => {
            if (err) throw err;
        });
        res.end(JSON.stringify({'ok':'ok'}));
    }
    else {
        const fpath = path.join('C:/Users/pc/Desktop/paw/PAW_24_25/2.10.24/assets',req.url);
        fs.access(fpath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    error:'Not Found',
                    statusCode : 404}));
            }
            else{
                fs.readFile(fpath, (err, data) => {
                    if (err) throw err;
                    else {
                        const fextension = mime.getType(fpath);
                        res.writeHead(200, {'Content-Type': fextension});
                        res.end(data);
                    }
                })
            }

        })

    }
});

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`);
})