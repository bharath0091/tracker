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

router.get('/rest/action-id/:actionId', function(req, res) {
    getEmployeesAndActionData(req.params.actionId, function(employees, actionData){
        console.log("actionData : " + actionData);
        var defaulters = getDefaulters(employees, actionData);
        console.log("defaulters : " + JSON.stringify(defaulters))
        res.end(JSON.stringify(defaulters));
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

function getEmployeesAndActionData(actionId, callback) {
    console.log("actionId : " + actionId);
    mongoUtil.getDocumentById('action', actionId, function(data){
        var action = data[0];
        console.log("action : " + JSON.stringify(action))
        mongoUtil.getDocuments('employees', {project : action.assignedTo}, function(data){
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

