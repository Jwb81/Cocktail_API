
module.exports = function(app, db) {
    app.post('/recipes', (req, res) => {
        // Create a note here
        console.log(req.body);
        res.send('Hello');
    });
    
};