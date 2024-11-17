const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const prismaClient = require('@prisma/client');

const port = 3000;
const hostname = '127.0.0.1';

const app = express();

//const prisma = new prismaClient();
const conn = mysql.createConnection({
  host: hostname,
  user: 'root'
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, hostname, () => {
  console.log(`Listening on ${hostname}:${port}`);
})

module.exports = app;