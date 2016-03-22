var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(__dirname + '/public'));

//mongoUtilModule
var mongoUtilModule = require('./modules/mongoutil');
var mongoUtil = mongoUtilModule;
mongoUtil.connectToServer(function(err) {
console.dir(err);
}
);

var ValidatorFactory = require('./modules/validations').Factory;

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

router.get('/rest/list/:collectionName', function(req, res) {
        console.log("received get request :" + req.params.collectionName);
        mongoUtil.getAllDocuments(req.params.collectionName, function(data){
            console.log("response " + data);
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

router.post('/rest/:collectionName', function(req, res) {
    console.log("received post request : " + JSON.stringify(req.body) + " collectionName :" +  req.params.collectionName);
    var status = ValidatorFactory.produce('project').validate(req.body);
    if (status.success) {
        mongoUtil.insertOneDocument(req.params.collectionName, req.body);
        res.json(status);
    } else {
        res.status(400).json(status);
    }
});

function validateProject(newProject, callback) {
    if(!newProject || !newProject.name || !newProject.name.trim())  {
        callback(new status(false, 'project name cant be empty'));
    }

    mongoUtil.getAllDocuments('project', function(data){
        var isDuplicate = false;
        for	(var projectIndex = 0; projectIndex < data.length; projectIndex++) {
            var project = data[projectIndex];
            if(newProject.name == project.name){
                isDuplicate = true;
                break;
            }
        }
        if (isDuplicate) {
            callback(new status(false, 'duplicate project'));
        } else {
            callback(new status(true, 'ok'));
        }
    });
}

router.delete("/rest/:collection/:id", function(req, res) {
    var id = req.params.id;
    console.log("received DELETE request for " + id);
    var collection = req.params.collection;
    console.log("received DELETE request for collection :" + collection);
    mongoUtil.deleteDocumentById(collection, id, function (err, results) {
        console.log(err);
    res.end();
    })
});

module.exports = router;

