
const recipesRoute = require('./recipes_route.js');
const ingredientsRoute = require('./ingredients_route.js');
const usersRoute = require('./users_route.js');

module.exports = function(app, db) {
    // Put all route groups here
    recipesRoute(app, db);
    ingredientsRoute(app, db);
    usersRoute(app, db);
};