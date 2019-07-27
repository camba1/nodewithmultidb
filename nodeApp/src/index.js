'use strict';

const express = require('express');
const postgresdb = require('./postgresData')
const mySqldb = require('./mySqlData');
const mymariadb = require('./mariadbData');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';



// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world!\n');
});

app.get('/mysql', (req, res) => {
  mySqldb.getMySqlData(req, res)
  }
);

app.get('/mariadb', (req, res) => {
  mymariadb.getmariadbData(req, res)
  }
);

app.get('/postgres', (req, res) => {
  postgresdb.getPostgresData(req, res)
  }
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
