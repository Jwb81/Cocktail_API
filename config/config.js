
module.exports = {
    databases: {
        mongo: {
            url: "mongodb://admin:London.2114!@ds137862.mlab.com:37862/bartender",
            name: 'bartender',
            production: {
                recipes_collection: 'recipes',
                ingredients_collection: 'ingredients'
            },
            development: {
                recipes_collection: 'test_recipes',
                ingredients_collection: 'test_ingredients'
            }
        },
        sql: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'cocktaildb'
        }
    }
}