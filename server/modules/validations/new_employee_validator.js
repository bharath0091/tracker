/**
 * Created by t937426 on 3/22/2016.
 */


module.exports = {
    //TODO check if email id and given project name are valid
    name : 'NewEmployeeValidator',
    validate: function (employee, callback) {
        var status = basicChecks(employee);
        if (status.success) {
            checksAgainstDb(employee, callback);
        } else {
            callback(status);
        }
    }
}

function checksAgainstDb(employee, callback) {
    var mongoUtil = require('../mongoutil');
    var status = require("../domain/status.js");
    mongoUtil.connectToServer(function(err) {
        console.dir(err);
        mongoUtil.getDocumentByFieldName('employee', 'id', employee.id, function(data){
            console.log('data ' + JSON.stringify(data));
            console.log('id ' + employee.id);
            if (data && data.length > 0) {
                callback(new status(false, 'Given employee id is already present'));
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
