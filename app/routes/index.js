
const recipesRoute = require('./recipes_route.js');

module.exports = function(app, db) {
    // Put all route groups here
    recipesRoute(app, db);
    
};