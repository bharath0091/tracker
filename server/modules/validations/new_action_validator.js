/**
 * Created by t937426 on 3/22/2016.
 */


module.exports = {
    //TODO check if email id and given project name are valid
    name : 'NewActionValidator',
    validate: function (action, callback) {
        var status = basicChecks(action);
        if (status.success) {
            checksAgainstDb(action, callback);
        } else {
            callback(status);
        }
    }
}

function checksAgainstDb(action, callback) {
    var mongoUtil = require('../mongoutil');
    var status = require("../domain/status.js");
    mongoUtil.connectToServer(function(err) {
        console.dir(err);
        mongoUtil.getDocumentByFieldName('action', 'name', action.name, function(data){
            console.log('data ' + JSON.stringify(data));
            console.log('id ' + action.id);
            console.log(data.length);
            if (data && data.length > 0) {
                callback(new status(false, 'Given Action name is already present'));
            } else {
                callback(new status(true, 'ok'));
            }
        });
});
}

function basicChecks(action) {
    var status = require("../domain/status.js");
    if(!(action)) {
        return (new status(false, 'Invalid action details'));
    } else if (!(action.name && action.name.trim())) {
        return (new status(false, 'Action name cant be empty'));
    } else if (!(action.lastDate && action.lastDate.trim())) {
        return (new status(false, 'Action last date cant be empty'));
    } else if (!isFutureDate(action.lastDate)) {
        return (new status(false, 'Action last date must be in future'));
    } else if (!(action.assignedTo && action.assignedTo.trim())) {
        return (new status(false, 'Action assigned to cant be empty'));
    } else {
        return (new status(true, 'Validation ok'));
    }
}

function isFutureDate(date) {
    return (new Date()).getDate() <= (new Date(date)).getDate();
}
