/**
 * Created by t937426 on 3/22/2016.
 */


module.exports = {
    //TODO check if email id and given project name are valid
    name : 'UpdateEmployeeValidator',
    validate: function (employee, callback) {
        var status = basicChecks(employee);
        if (status.success) {
            checksAgainstDb(employee, callback);
        } else {
            callback(status);
        }
    }
}

function checksAgainstDb(newEmployee, callback) {
    var mongoUtil = require('../mongoutil');
    var status = require("../domain/status.js");
    mongoUtil.connectToServer(function(err) {
        console.dir(err);
        mongoUtil.getDocumentByFieldName('employee', 'id', newEmployee.id, function(data){
            var isDuplicate = false;
            for	(var index = 0; index < data.length; index++) {
                var employee = data[index];
                if(newEmployee.id == employee.id && !(newEmployee._id == undefined || newEmployee._id == employee._id)){
                    isDuplicate = true;
                    break;
                }
            }
            if (isDuplicate) {
                callback(new status(false, 'duplicate employee id'));
            } else {
                callback(new status(true, 'ok'));
            }
        });
});
}

function basicChecks(employee) {
    var status = require("../domain/status.js");
    if(!(employee)) {
        return (new status(false, 'Invalid employee details'));
    } else if (!(employee.id && employee.id.trim())) {
        return (new status(false, 'Employee id cant be empty'));
    } else if (!(employee.name && employee.name.trim())) {
        return (new status(false, 'Employee name cant be empty'));
    } else if (!(employee.email && employee.email.trim())) {
        return (new status(false, 'Employee email cant be empty'));
    } else if (!(employee.project && employee.project.trim())) {
        return (new status(false, 'Employee project cant be empty'));
    } else {
        return (new status(true, 'Validation ok'));
    }
}
