
    

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    // get all ingredients
    app.get('/ingredients', (req, res) => {
        db.collection('ingredients').find({}).toArray((err, result) => {
            if (err) res.send(err);
            res.send(result);
        });
    });

    // get one ingredient's object
    app.get('/ingredients/:id', (req, res) => {
        const details = { '_id' : new ObjectID(req.params.id) };

        db.collection('ingredients').findOne(details, (err, item) => {
            if (err) res.send({'error' : 'An error has occurred'});

            res.send(item);
        })
    });

    // add an ingredients
    app.post('/ingredients', (req, res) => {
        const ingredient = {name : req.body.name, cost : req.body.cost};
        
        db.collection('ingredients').insertOne(ingredient, (err, result) => {
            if (err) res.send({ 'error': 'An error has occurred' });

            res.send(result);
        });
    });

    // delete an ingredient
    app.delete('/ingredients/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        
        db.collection('ingredients').deleteOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Recipe ' + id + ' deleted!');
          } 
        });
    });

    // update (or create) an ingredient
    app.put('/ingredients/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const ingredient = { $set : { name: req.body.name, cost: req.body.cost }};
        
        db.collection('ingredients').updateOne(details, ingredient, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(recipe);
          } 
        });
    });

    
};