var MongoClient = require('mongodb').MongoClient;
const config = require('./config');


let dbUrl;

if (process.env.MONGODB_URI) {
    dbUrl = process.env.MONGODB_URI;
} else {
    dbUrl = config.databases.mongo.url
}

module.exports.init = function (callback) {
    MongoClient.connect(dbUrl, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) return console.log(err);

        // for Mongo versions 3.0+
        db = client.db(config.databases.mongo.name);
        // db.collection('ingredients').find({}).toArray((err, result) => {
        //     console.log(result);
        // });

        module.exports.client = client;
        module.exports.db = db;

        callback(err);
    })
};