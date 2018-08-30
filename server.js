// server.js

const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const db            = require('./config/db');

const app           = express();
const port          = 1000;

app.use(bodyParser.urlencoded({ extended : true }));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err);
    require('./app/routes')(app, database);
    
    // start the app if the connection to the database is successful
    app.listen(port, () => {
        console.log('API listening on port ' + port);
    })

})

