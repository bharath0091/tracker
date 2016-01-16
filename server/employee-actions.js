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

router.get('/rest/employee-actions-by-employee-id/:employeeId', function(req, res) {
    mongoUtil.getDocuments('employees', {id : req.params.employeeId}, function(data){
        var employee = data[0];
        mongoUtil.getDocuments('action', {assignedTo : employee.project}, function(data){
            employee.actions = data;
            console.log("employee with actions : " + JSON.stringify(employee))
            res.end(JSON.stringify(employee));
        });
    });
  });

router.get('/rest/employee-action-by-their-ids/:employeeId/:actionId', function(req, res) {
    mongoUtil.getDocuments('employees', {id : req.params.employeeId}, function(data){
        var employee = data[0];
        mongoUtil.getDocumentById('action', req.params.actionId, function(data){
            employee.action =  data[0];
            console.log("employee with action : " + JSON.stringify(employee))
            res.end(JSON.stringify(employee));
        });
    });
});

router.post('/rest/action-result', function(req, res) {
    console.log("received post request :" + JSON.stringify(req.body));
    mongoUtil.insertOneDocument('action-result', req.body);
    res.end();
});


module.exports = router;

