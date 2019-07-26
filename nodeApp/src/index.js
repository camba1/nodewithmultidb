'use strict';

const express = require('express');
const postgresdb = require('./postgresData')
const mySqldb = require('./mySqlData');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

//MySql connection configuration

//Postgres connection configuration


// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world!\n');
});

app.get('/mysql', (req, res) => {
  mySqldb.getMySqlData(req, res)
  //res.send('Hello world2!\n');
  }
);

app.get('/postgres', (req, res) => {
  postgresdb.getPostgresData(req, res)
  //res.send('Hello world3!\n');
  }
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
