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

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

router.get('/rest/action-id/:actionId', function(req, res) {
    getEmployeesAndActionData(req.params.actionId, function(employees, actionData){
        console.log("actionData : " + actionData);
        var defaulters = getDefaulters(employees, actionData);
        console.log("defaulters : " + JSON.stringify(defaulters))
        res.end(JSON.stringify(defaulters));
    });
  });

router.get('/report/rest/action-id/:actionId', function(req, res) {
    getEmployeesAndActionData(req.params.actionId, function(employees, actionData){
        console.log("actionData : " + JSON.stringify(actionData))
        res.end(JSON.stringify(actionData));
    });
});



function getEmployeesAndActionData(actionId, callback) {
    console.log("actionId : " + actionId);
    mongoUtil.getDocumentById('action', actionId, function(data){
        var action = data[0];
        console.log("action : " + JSON.stringify(action))
        mongoUtil.getDocuments('employee', {project : action.assignedTo}, function(data){
            var employees = data;
            mongoUtil.getDocuments('data', {actionId : actionId}, function(data) {
                callback(employees, data);
            });
        });
    });
}

function getDefaulters(employees, actionData) {
    var defaulters = [];
    for	(var employeeIndex = 0; employeeIndex < employees.length; employeeIndex++) {
        var employee = employees[employeeIndex];
        var isEmployeeDefaulter = true;
        for	(var dataIndex = 0; dataIndex < actionData.length; dataIndex++) {
            var data = actionData[dataIndex];
            if (data.employeeId == employee.id) {
                isEmployeeDefaulter = false;
                break;
            }
        }
        if (isEmployeeDefaulter) {
            defaulters.push(employee);
        }
    }
    return defaulters;
}

module.exports = router;

