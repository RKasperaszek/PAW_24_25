import express from 'express';
import fs from 'fs';
import * as url from 'url';
import path from 'path';
import mime from 'mime';

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.status(200).send('Strona Główna');
});

app.get('/json', (req, res) => {
    const json_file = { "file": "json" };
    res.status(200).json(json_file);
});

app.get('/html', (req, res) => {
    const html = `
    <html lang="en">
    <head>
      <title>HTML</title>
    </head>
    <body>
      <h1>Dokument HTML generowany w kodzie</h1>
    </body>
    </html>`;
    res.status(200).send(html);
});

app.get('/html-file', (req, res) => {
    const filePath = path.join("C:/Users/pc/Desktop/paw/PAW_24_25/7.10.24", 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        else {
            res.status(200).contentType('text/html').send(data);
        }
    });
});

app.get('/get_params', (req, res) => {
    const params = req.query;
    console.log(params);
    const fpath = path.join("C:/Users/pc/Desktop/paw/PAW_24_25/7.10.24", `params_${new Date().getTime()}.json`);

    fs.writeFile(fpath, JSON.stringify(params), (err) => {
        if (err) throw err;
    });

    res.send(JSON.stringify({ok : "ok"}));
});

app.get('*', (req, res) => {
    const fpath = path.join('C:/Users/pc/Desktop/paw/PAW_24_25/7.10.24/assets', req.path);

    fs.access(fpath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'Not Found', statusCode: 404 });
        } else {
            fs.readFile(fpath, (err, data) => {
                if (err) throw err;
                else {
                    const fextension = mime.getType(fpath);
                    res.status(200).contentType(fextension).send(data);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
