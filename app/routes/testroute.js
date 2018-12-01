const router = require('express').Router();
const orm = require('../../config/orm');
var ObjectID = require('mongodb').ObjectID;


// get all ingredients
router.get('/ingredients', (req, res) => {
    orm.getAllIngredients((err, data) => {
        if (err) {
            res.send(err);
        }

        res.json(data);
    });
    // db.collection('ingredients').find({}).toArray((err, result) => {
    //     if (err) res.send(err);
    //     res.send(result);
    // });
    // res.send(results);
});

// get one ingredient's object
router.get('/ingredients/:id', (req, res) => {
    const details = {
        '_id': new ObjectID(req.params.id)
    };

    // db.collection('ingredients').findOne(details, (err, item) => {
    //     if (err) res.send({
    //         'error': 'An error has occurred'
    //     });

    //     res.send(item);
    // })
});


module.exports = router;