// server.js

const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');

const app           = express();
const port          = 1000;

app.listen(port, () => {
    console.log('API listening on port ' + port);
})