/**
 * Created by t937426 on 3/22/2016.
 */

function status (success, message) {
    this.success = success;
    this.message = message;
}

module.exports = {
    name : 'ProjectValidator',
    validate: function (project) {
        console.log("project " + project)
        if (project && project.name && project.name.trim()) {
            return (new status(true, 'validation ok'));
        } else {
            return (new status(false, 'project name cant be empty'));
        }
    }
}