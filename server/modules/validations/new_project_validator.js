/**
 * Created by t937426 on 3/22/2016.
 */


module.exports = {
    name : 'NewProjectValidator',
    validate: function (project, callback) {
        var status = require("./util.js").validationsBasic.checkProjectName(project);
        if (status.success) {
            require("./util.js").validationsAgainstDb.checkIfProjectExistsAlready(project, function(status) {
                callback(status);
            });
        } else {
            callback(status);
        }
    }
}
