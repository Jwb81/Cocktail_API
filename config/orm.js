const config = require('./config')
const mongo = require('./mongo');
const db = mongo.db;
var ObjectID = require('mongodb').ObjectID;


/**
 * FUNCTIONS
 * 
 * functions for recipes and ingredients
 * @function getAll
 * @function getByIds
 * @function getOne
 * @function filterByName
 * @function insertOne
 * @function deleteById
 * @function updateById
 * 
 * 
 * other functions
 * @function getMakeableRecipes
 * @function filterMakeableRecipes
 * 
 */
const orm = {

    getAll: (collection, cb) => {
        db.collection(collection).find({}).toArray((err, items) => {
            if (err) {
                return cb(new Error(err));
            }

            cb(null, items);
        });
    },

    getByIds: (collection, idArr, cb) => {
        if (!idArr.length) {
            return cb(new Error('Must pass in at least one ID'));
        }

        // map the array and return new ObjectId
        const fullObjArr = idArr.map(id => {
            return {
                _id: ObjectID(id)
            }
        })

        const findDetails = {
            $or: fullObjArr
        };


        db.collection(collection).find(findDetails).toArray((err, result) => {
            if (err) {
                return cb(new Error(err));
            }

            cb(null, result);
        });
    },

    getOne: (collection, id, cb) => {
        try {
            const details = {
                '_id': new ObjectID(id)
            };

            db.collection(collection).findOne(details, (err, item) => {
                if (err) {
                    return cb(new Error(err));
                }

                cb(null, item);
            })

        } catch (error) {
            return cb(new Error(error));
        }
    },

    filterByName: (collection, searchTerm, cb) => {
        db.collection(collection).find({
            name: {
                $regex: new RegExp(searchTerm),
                $options: 'i'
            }
        }).toArray((err, items) => {
            if (err) {
                return cb(new Error(err));
            }

            // return an array of only the names 
            // const itemsArr = items.map(obj => {
            //     return obj.name;
            // })

            cb(null, items);
            // cb(null, itemsArr);
        })
    },

    insertOne: (collection, obj, cb) => {
        db.collection(collection).insertOne(obj, (err, result) => {
            if (err) {
                return cb(new Error(err));
            }

            cb(null, result);
        });
    },

    deleteById: (collection, id, cb) => {
        const details = {
            _id: new ObjectID(id)
        }
        db.collection(collection).deleteOne(details, (err, result) => {
            if (err) {
                return cb(new Error(err));
            }

            cb(null, result);
        });
    },

    updateById: (collection, id, updateObj, cb) => {

        const filter = {
            _id: new ObjectID(id)
        };

        db.collection(collection).updateOne(filter, updateObj, (err, result) => {
            if (err) {
                return cb(new Error(err));
            }

            cb(null, result);
        });
    },

    // getMakeableRecipes: (currIngredientsArr, cb) => {
    //     // const collection = 'test_recipes';
    //     const collection = 'test_ingredients';
    //     return new Promise((resolve, reject) => {
    //             // get all recipes
    //             orm.getAll(collection, (err, items) => {
    //                 if (err) {
    //                     return reject(new Error(err));
    //                 }

    //                 console.log('returning from getAll');
    //                 resolve(items);
    //             });
    //         })
    //         .then(items => {
    //             return orm.getAll(collection, (err, moreItems) => {
    //                 console.log('In .then()');
    //                 // console.log(moreItems);
    //                 cb(null, moreItems);
    //                 return moreItems;
    //             })
    //         })
    //         .then(moreItems => {
    //             console.log('moreItems');
    //         })
    //         .catch(err => {
    //             cb(err);
    //         })
    // },

    // getMakeableRecipes: (collection, currIngredientsArr, cb) => {
    //     return new Promise((resolve, reject) => {
    //             // get all recipes
    //             orm.getAll(collection, (err, items) => {
    //                 if (err) {
    //                     return reject(new Error(err));
    //                 }

    //                 resolve(orm.filterMakeableRecipes(currIngredientsArr, items));
    //             });
    //         })
    //         .catch(err => {
    //             cb(err);
    //         })
    // },

    getMakeableRecipes: (currIngredientsArr, cb) => {
        currIngredientsArr = ["5b92ba92e7179a26041b2f83", "5b92bac4e7179a26041b2f87"];

        // get all recipes
        const collection = 'test_recipes';

        orm.getAll(collection, (err, recipes) => {
            if (err) {
                return cb(new Error(err));
            }

            orm.getByIds('test_ingredients', currIngredientsArr, (err, ingredients) => {
                if (err) {
                    return cb(new Error(err));
                }

                cb(null, orm.filterMakeableRecipes(ingredients, recipes));
            })

        })
    },

    filterMakeableRecipes: (current, all) => {
        return all.filter(a => {
            let keep = false;
            a.recipe.forEach(aIngredient => {
                keep = false;
                current.forEach(cIngredient => {
                    if (((aIngredient.generic_ingredient === cIngredient.name) || (aIngredient.specific_ingredient == cIngredient.name) ||
                            (aIngredient.generic_ingredient === cIngredient.generic_ingredient) || (aIngredient.specific_ingredient == cIngredient.generic_ingredient))) {
                        console.log(`
                                    Recipe generic: ${aIngredient.generic_ingredient}
                                    Recipe specific: ${aIngredient.specific_ingredient}
                                    Ingred generic: ${cIngredient.generic_ingredient}
                                    Ingred specific: ${cIngredient.generic_ingredient}
                                `)
                        keep = true;
                    }
                });
            });
            return keep;
        });
    },
}


module.exports = orm;