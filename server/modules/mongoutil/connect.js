var db = require('mongodb'); //var mangojs = require("mangojs");
var ObjectID = db.ObjectID;
var MongoClient = db.MongoClient;

var _db;

module.exports = function() {
return {

  connectToServer : function( callback ) {
                        MongoClient.connect( "mongodb://localhost:27017/employees", function( err, db ) {
                          _db = db;
                           callback( err ); //return callback( err ); TODOD : What is the use of return here?
                        } );
                      },
 getCollection : function (collectionName) {
                    return _db.collection(collectionName);
                 },
  getDb : function() {
            return _db;
          },
  getAllDocuments : function (collectionName) {
                        return this.getCollection(collectionName).find({});
                    },
  insertOneDocument : function (collectionName, document) {
                        return this.getCollection(collectionName).insertOne(document);
                     },
  deleteDocumentById : function (collectionName, id, callback) {
                        this.getCollection(collectionName).deleteOne({_id : ObjectID(id)}, function() {
                        callback (err, results)
                        });
                     }
}
};


//or u can use exports = method

