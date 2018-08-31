
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/recipes/:id', (req, res) => {
        const details = { '_id' : new ObjectID(req.params.id) };

        db.collection('recipes').findOne(details, (err, item) => {
            if (err) res.send({'error' : 'An error has occurred'});

            res.send(item);
        })
    });

    app.post('/recipes', (req, res) => {
        // Create a recipe here
        const recipe = {name : req.body.name, cost : req.body.cost};
        
        db.collection('recipes').insertOne(recipe, (err, result) => {
            if (err) res.send({ 'error': 'An error has occurred' });

            res.send(result);
        });
    });

    app.delete('/recipes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        
        db.collection('recipes').deleteOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Recipe ' + id + ' deleted!');
          } 
        });
    });

    app.put('/recipes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const recipe = { $set : { name: req.body.name, cost: req.body.cost }};
        
        db.collection('recipes').updateOne(details, recipe, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(recipe);
          } 
        });
    });
};