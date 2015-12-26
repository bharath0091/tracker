var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));//????????????
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//must read
//http://blog.mongolab.com/2013/11/deep-dive-into-connection-pooling/

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

app.get('/rest/list', function(req, res) {
        console.log("received get request");
        mongoUtil.getAllDocuments('employees', function(data){
          res.end(JSON.stringify(data));
       });
});

app.post('/rest', function(req, res) {
    console.log("received post request :" + JSON.stringify(req.body));
    mongoUtil.insertOneDocument('employees', req.body);
    res.end();
});

app.delete("/rest/:id", function(req, res) {
    var id = req.params.id;
    console.log("received DELETE request for " + id);
    mongoUtil.deleteDocumentById('employees', id, function (err, results) {
        console.log(err);
        console.log(results);
    res.end();
    })
});

// Test purpose
console.log(__dirname);
//End Test purpose


app.listen(5000);
console.log("server listening at 5000");