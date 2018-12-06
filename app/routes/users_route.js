const router = require('express').Router();
const orm = require('../../config/orm');



// get all users
router.get('/users', (req, res) => {
    res.send('This route has no functionality right now');
})

// get a user by userna,e
router.get('/users/:username', (req, res) => {
    res.send('This route has no functionality right now');
})

// get a user's favorited recipes
router.get('/users/:username/favorites', (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.json({
            status: 404,
            message: 'A username must be given'
        });
    }

    orm.getUserFavorites(username, (err, result) => {
        if (err) {
            return res.json({
                status: 500,
                error: err.message
            });
        }

        res.json(result);
    })
})


// add or remove a recipe
router.post('/users/:username/favorites', (req, res) => {
    const username = req.params.username;
    const recipeId = req.body.recipe_id;
    const render = req.body.render;

    orm.setUserFavorites(username, recipeId, render, (err, data) => {
        if (err) {
            return res.json({
                status: 500,
                error: err.message
            });
        }

        res.json(data);
    })
    
})

router.post('/users', (req, res) => {
    // const userObj = req.body.user;

    const bod = req.body;
    if (!(bod.first_name && bod.username && bod.email && bod.password)) {
        return res.json({
            status: 300,
            message: 'Not all required information was given'
        })
    }

    orm.addUser(req.body, (err, result) => {
        if (err) {
            return res.json({
                status: 500,
                error: err.message
            });
        }

        res.json({
            status: 201
        })
    })
})


module.exports = router;




// var ObjectID = require('mongodb').ObjectID;

// module.exports = function(app, db) {
//     // find a specific user based on id
//     app.get('/users/:id', (req, res) => {
//         const details = { '_id' : new ObjectID(req.params.id) };

//         db.collection('users').findOne(details, (err, item) => {
//             if (err) res.send({'error' : 'An error has occurred'});

//             res.send(item);
//         })
//     });

//     // find a user with certain username and password
//     app.post('/users', (req, res) => {
//         const details = { 'username' : req.body.username, 'password' : req.body.password };

//         db.collection('users').findOne(details, (err, item) => {
//             if (err) res.send({'error' : 'An error has occurred'});
//             res.send(item);
//         })
//     })

//     // get user favorites by username 
//     app.get('/users/favorites/:username', (req, res) => {
//         const details = { username : req.params.username };

//         db.collection('users').findOne(details, (err, item) => {
//             if (err) res.send({'error' : 'An error has occurred'});
//             res.send(item.favorites);
//         })
//     })

//     // update user favorites
//     app.put('/users/favorites', (req, res) => {
        
//         const details = { username : req.body.username };
//         const favorites = { $set : { favorites : JSON.parse(req.body.favorites) } };

        

//         db.collection('users').updateOne(details, favorites, (err, result) => {
//             if (err) {
//                 res.send({'error':'An error has occurred'});
//             } else {
//                 res.send(result);
//             } 
//         });
//     })

// };