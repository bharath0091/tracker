var express = require('express');
//var mangojs = require("mangojs");
var router = express.Router();
//router.use(express.static(__dirname + '/public/action.html'));//????????????

//var db = mangojs("employees", ["employees"]);
var db = require('mongodb');
var ObjectID = db.ObjectID;
var MongoClient = db.MongoClient;

var bodyParser = require('body-parser');
router.use(bodyParser.json());

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


router.get('/', function(req, res) {
    console.log("received get request");
res.render('action');

});


router.get('/rest', function(req, res) {
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

router.post('/rest', function(req, res) {
    console.log("received post request");
    MongoClient.connect("mongodb://localhost:27017/employees", function(err, db) {
        if(err) { return console.dir(err); }
        var collection = db.collection('employees');
        console.log(req.body)
        collection.insertOne(req.body);
    });
});

router.delete("/rest:id", function(req, res) {
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

module.exports = router;

