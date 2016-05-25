/**
 * Created by t937426 on 3/22/2016.
 */


module.exports = {
    //TODO check if email id and given project name are valid
    name : 'UpdateActionValidator',
    validate: function (action, callback) {
        var status = basicChecks(action);
        if (status.success) {
            checksAgainstDb(action, callback);
        } else {
            callback(status);
        }
    }
}

function checksAgainstDb(newAction, callback) {
    var mongoUtil = require('../mongoutil');
    var status = require("../domain/status.js");
    mongoUtil.connectToServer(function(err) {
        console.dir(err);
        mongoUtil.getDocumentByFieldName('action', 'name', newAction.name, function(data){
            var isDuplicate = false;
            for	(var index = 0; index < data.length; index++) {
                var action = data[index];
                if(newAction.name == action.name && !(newAction._id == undefined || newAction._id == action._id)){
                    isDuplicate = true;
                    break;
                }
            }
            if (isDuplicate) {
                callback(new status(false, 'duplicate action name'));
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
    } else if (action.fields && (action.fields.length == 0 || !isValidFields(action.fields))) {
        return (new status(false, 'Action new field name and type cant be empty'));
    } else {
        return (new status(true, 'Validation ok'));
    }
}

function isValidFields(fields) {
  for (var index = 0; index < fields.length; index++) {
      var field = fields[index];
      if (!(field && field.name && field.name.trim() && field.type && field.type.trim())) {
          return false;
      }
  }
return true;
}

function isFutureDate(date) {
    return (new Date()).getDate() <= (new Date(date)).getDate();
}
