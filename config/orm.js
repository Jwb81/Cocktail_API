const config = require('./config')
const mongo = require('./mongo');
const db = mongo.db;
var ObjectID = require('mongodb').ObjectID;


/**
 * FUNCTIONS
 * 
 * functions for recipes and ingredients
 * @function getAll
 * @function getOne
 * @function filterByName
 * @function insertOne
 * @function deleteById
 * @function updateById
 * 

 * functions for users
 * 
 * 
 * other functions
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
            name: { $regex: new RegExp(searchTerm), $options: 'i'} 
        }).toArray((err, items) => {
            if (err) {
                return cb(new Error(err));
            }

            cb(null, items);
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
}


module.exports = orm;