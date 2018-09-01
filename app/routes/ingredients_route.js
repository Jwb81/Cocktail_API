
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    // get all ingredients
    app.get('/ingredients', (req, res) => {
        db.collection('ingredients').find({}).toArray((err, result) => {
            if (err) res.send(err);
            res.send(result);
        });
    });


    
};