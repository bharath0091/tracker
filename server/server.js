var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));//????????????
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var action = require('./action');
app.use('/action', action);


//mongoUtilModule
var mongoUtilModule = require('./modules/mongoutil');
var mongoUtil = mongoUtilModule();
mongoUtil.connectToServer(function(err) {
console.dir(err);
}
);

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

app.get('/rest', function(req, res) {
        console.log("received get request");
        mongoUtil.getAllDocuments('employees').toArray(function (err, docs) {
        console.log(JSON.stringify(docs));
        res.end(JSON.stringify(docs));
  });
});

app.post('/rest', function(req, res) {
    console.log("received post request");
    mongoUtil.insertOneDocument('employees', req.body);
});

app.delete("/rest/:id", function(req, res) {
    var id = req.params.id;
    console.log("received DELETE request for " + id);
    mongoUtil.deleteDocumentById('employees', id, function (err, results) {
        console.log(err);
        console.log(results);
    })
});

// Test purpose
console.log(__dirname);
//End Test purpose


app.listen(5000);
console.log("server listening at 5000");