var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = function(dbName) {
return {

  connectToServer : function( callback ) {
    MongoClient.connect( "mongodb://localhost:27017/test" + dbName, function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
}

};


//or u can use exports = method

