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
    var employeeId = req.params.employeeId;
        console.log("received get request");
    mongoUtil.getDocumentById('employees', employeeId, function(data){
        var employee = data[0];
        console.log("employee : " + JSON.stringify(employee))
        mongoUtil.getDocuments('action', {assignedTo : employee.project}, function(data){
            var actions = data;
            employee.actions = actions;
            console.log("employee with actions : " + JSON.stringify(employee))
            res.end(JSON.stringify(employee));
        });
    });
  });

router.get('/rest/employee-action-by-their-ids/:employeeId/:actionId', function(req, res) {
    var employeeId = req.params.employeeId;
    var actionId = req.params.actionId;
    console.log("received get request");
    mongoUtil.getDocumentById('employees', employeeId, function(data){
        var employee = data[0];
        console.log("employee : " + JSON.stringify(employee))
        mongoUtil.getDocumentById('action', actionId, function(data){
            var action = data[0];
            employee.action = action;
            console.log("employee with action : " + JSON.stringify(employee))
            res.end(JSON.stringify(employee));
        });
    });
});


module.exports = router;

