
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    // find a specific user based on id
    app.get('/users/:id', (req, res) => {
        const details = { '_id' : new ObjectID(req.params.id) };

        db.collection('users').findOne(details, (err, item) => {
            if (err) res.send({'error' : 'An error has occurred'});

            res.send(item);
        })
    });

    // find a user with certain username and password
    app.post('/users', (req, res) => {
        const details = { 'username' : req.body.username, 'password' : req.body.password };

        db.collection('users').findOne(details, (err, item) => {
            if (err) res.send({'error' : 'An error has occurred'});
            res.send(item);
        })
    })

    // get user favorites by username 
    app.get('/users/favorites/:username', (req, res) => {
        const details = { username : req.params.username };

        db.collection('users').findOne(details, (err, item) => {
            if (err) res.send({'error' : 'An error has occurred'});
            res.send(item.favorites);
        })
    })

    // update user favorites
    app.put('/users/favorites', (req, res) => {
        
        const details = { username : req.body.username };
        const favorites = { $set : { favorites : JSON.parse(req.body.favorites) } };

        

        db.collection('users').updateOne(details, favorites, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result);
            } 
        });
    })

    // update (or create) an ingredient
    app.put('/ingredients/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const ingredient = { $set : { name: req.body.name, cost: req.body.cost }};
        
       
    });
    
};