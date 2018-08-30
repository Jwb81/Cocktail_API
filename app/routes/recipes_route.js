
module.exports = function(app, db) {
    app.post('/recipes', (req, res) => {
        // Create a recipe here
        // console.log(req.body.name);
        const recipe = {name : req.body.name, cost : req.body.cost};
        // console.log(recipe);
        db.collection('recipes').insertOne(recipe, (err, result) => {
            if (err) res.send({ 'error': 'An error has occurred' });

            res.send(result);
        });
    });
};