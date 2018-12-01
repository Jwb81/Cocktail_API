const router = require('express').Router();
const orm = require('../../config/orm');

const collection = 'test_ingredients';

router.get('/ingredients', (req, res) => {
    orm.getAll(collection, (err, items) => {
        if (err) {
            return res.json({
                status: 404,
                success: false,
                error: err.message
            });
        }
        res.json(items);
    })
});

// get one ingredient's object
router.get('/ingredients/:id', (req, res) => {
    orm.getOne(collection, req.params.id, (err, item) => {
        if (err) {
            return res.json({
                status: 404,
                success: false,
                error: err.message
            });
        }

        res.json(item);
    })
});

// filter ingredients by a search term
router.get('/ingredients/filter/:term', (req, res) => {
    const searchTerm = req.params.term;
    
    orm.filterByName(collection, searchTerm, (err, items) => {
        if (err) {
            return res.json({
                status: 404,
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            data: items
        })
    })
})

// add an ingredients
router.post('/ingredients', (req, res) => {
    const body = req.body;

    const ingredientObj = {
        name: body.name,
        image: body.image,
        generic_type: body.generic_type,
        alcohol_content: body.abv,
        serving_size: body.serving_size,
        description: body.description,
        relay_location: body.relay_location,
        active: body.active
    };

    orm.insertOne(collection, ingredientObj, (err, result) => {
        if (err) {
            return res.json({
                status: 404,
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true
        })
    })
});

// delete an ingredient
router.delete('/ingredients/:id', (req, res) => {
    const id = req.params.id;

    orm.deleteById(collection, id, (err, result) => {
        if (err) {
            return res.json({
                status: 404,
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true
        });
    })
});

// update (or create) an ingredient
router.put('/ingredients/:id', (req, res) => {
    const id = req.params.id;

    const ingredientObj = {
        $set: {
            name: req.body.name,
            cost: req.body.cost
        }
    };

    orm.updateById(collection, id, ingredientObj, (err, result) => {
        if (err) {
            return res.json({
                status: 404,
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true
        });
    })
});


module.exports = router;