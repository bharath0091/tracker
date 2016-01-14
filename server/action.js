var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(__dirname + '/public'));


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

router.get('/rest/list', function(req, res) {
        console.log("received get request");
        mongoUtil.getAllDocuments('action', function(data){
          res.end(JSON.stringify(data));
       });
  });


router.get('/rest/view-details-by-id/:id', function(req, res) {
    var id = req.params.id;
    console.log("received get request for " + id);
    mongoUtil.getDocumentById('action', id, function(data){
    res.end(JSON.stringify(data[0]));
    });
  });

router.post('/rest', function(req, res) {
    console.log("received post request : " + JSON.stringify(req.body));
    mongoUtil.insertOneDocument('action', req.body);
    res.end();
});

router.delete("/rest/:id", function(req, res) {
    var id = req.params.id;
    console.log("received DELETE request for " + id);
    mongoUtil.deleteDocumentById('action', id, function (err, results) {
        console.log(err);
        console.log(results);
    res.end();
    })
});


module.exports = router;

