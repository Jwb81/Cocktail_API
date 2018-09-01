
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    // find a specific user based on id
    app.get('/users/:id', (req, res) => {
        const details = { '_id' : new ObjectID(req.params.id) };

        db.collection('recipes').findOne(details, (err, item) => {
            if (err) res.send({'error' : 'An error has occurred'});

            res.send(item);
        })
    });

    app.post('/users', (req, res) => {
        // create a new user
        const user = {};
        
        db.collection('users').insertOne(user, (err, result) => {
            if (err) res.send({ 'error': 'An error has occurred' });

            res.send(result);
        });
    });

    app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        
        db.collection('users').deleteOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Recipe ' + id + ' deleted!');
          } 
        });
    });

    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = { $set : {  }};
        
        db.collection('recipes').updateOne(details, user, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(recipe);
          } 
        });
    });

    
};