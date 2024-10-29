const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const hostname = '127.0.0.1';

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/o-nas', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'about.html'));
});

app.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'ofert.html'));
});

app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'contact.html'));
});

app.post('/kontakt', (req, res) => {
  console.log("Dane z formularza:", req.body);
  res.redirect('/');
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`);
})



module.exports = app;
