const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const path = require('path');
// const config = require('./config/config');
const mongo = require('./config/mongo');

const app = express();
const port = process.env.PORT || 1001; // server is 1000, API is 1001

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.static(path.join(__dirname, 'public')));

// initialize the database
mongo.init(err => {
    if (err) {
        throw err;
    }

    // add routes
    app.use(require('./app/routes/ingredients_route'));
    app.use(require('./app/routes/recipes_route'));
    // app.use(require('./app/routes/users_route'));
    // app.use(require('./app/routes/testroute'));

    // default app
    app.get('*', (req, res) => {
        // fill in a 404 page here
        res.send('That is not a valid route')
    })

    // start the app if the connection to the database is successful
    app.listen(port, () => {
        console.log('API listening on port ' + port);
    })
})


