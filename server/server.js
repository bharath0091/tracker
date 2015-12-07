var express = require('express');
//var mangojs = require("mangojs");
var app = express();
app.use(express.static(__dirname + '/public'));//????????????

console.log(__dirname);

//var db = mangojs("employees", ["employees"]);
var db = require('mongodb');
var ObjectID = db.ObjectID;
var MongoClient = db.MongoClient;

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var action = require('./action');
app.use('/action', action);

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


app.get('/rest', function(req, res) {
console.log("received get request");

MongoClient.connect("mongodb://localhost:27017/employees", function(err, db) {
  	if(err) { return console.dir(err); }
		var collection = db.collection('employees');
      
		collection.find({}).toArray(function (err, docs) {
    console.log(JSON.stringify(docs));
    res.end(JSON.stringify(docs));
  });
  });
});

app.post('/rest', function(req, res) {
console.log("received post request");
    MongoClient.connect("mongodb://localhost:27017/employees", function(err, db) {
        if(err) { return console.dir(err); }
        var collection = db.collection('employees');
console.log(req.body)
        collection.insertOne(req.body);
    });
});

app.delete("/rest/:id", function(req, res) {
    var id = req.params.id;
    console.log("received DELETE request for " + id);
    MongoClient.connect("mongodb://localhost:27017/employees", function(err, db) {
        if(err) { return console.dir(err); }
        var collection = db.collection('employees');
        //_id : db.ObjectID(id) is not correct
collection.deleteOne({_id : ObjectID(id)}, function (err, results) {
            console.log(err);
    console.log(results);
        })
    });
    connectAndExecute(deleteOperation);
});

//function connectAndExecute(operation) {
//    MongoClient.connect("mongodb://localhost:27017/employees", function(err, db) {
//        if(err) { return console.dir(err); }
//        var collection = db.collection('employees');
//        operation(collection);
//    });
//}
//
//function deleteOperation(collection){
//    //_id : db.ObjectID(id) is not correct
//    collection.deleteOne({_id : ObjectID(id)}, function (err, results) {
//        console.log(err);
//        console.log(results);
//    })
//}



app.listen(5000);
console.log("server listening at 5000");