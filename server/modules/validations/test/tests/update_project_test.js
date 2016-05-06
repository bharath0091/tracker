var projectValidator = require('../../update_project_validator.js');

var Project = function(name, description, id) {
    this._id=id;
    this.name = name;
    this.description = description;
}

module.exports.testNullProject = function(test) {
    projectValidator.validate(null, function(status) {
        test.equal(status.success, false, "the value of status.success is :" + status.success);
        test.done();
    });
};

module.exports.testCorrectProject = function(test) {
    projectValidator.validate(new Project("help desk", "help desk prj"), function(status) {
        test.equal(status.success, true, "the value of status.success is :" + status.success);
        test.done();
    });
};
module.exports.testDuplicatetProject = function(test) {
    projectValidator.validate(new Project("kc", "help desk prj"), function(status) {
        test.equal(status.success, true, "the value of status.success is :" + status.success);
        test.done();
    });
};
module.exports.testUndefinedProject = function(test) {
    projectValidator.validate(undefined, function(status) {
        test.equal(status.success, false, "the value of status.success is :" + status.success);
        test.done();
    });
};
module.exports.testUndefinedProjectName = function(test) {
    projectValidator.validate(new Project(undefined, "help desk prj"), function(status) {
        test.equal(status.success, false, "the value of status.success is :" + status.success);
        test.done();
    });
};
module.exports.testEmptyProjectName = function(test) {
    projectValidator.validate(new Project("", "help desk prj"), function(status) {
        test.equal(status.success, false, "the value of status.success is :" + status.success);
        test.done();
    });
};
module.exports.testWhiteSpaceProjectName = function(test) {
    projectValidator.validate(new Project(" ", "help desk prj"), function(status) {
        test.equal(status.success, false, "the value of status.success is :" + status.success);
        test.done();
    });
};
module.exports.testProjectWithId_updateToAnExistingProjectname = function(test) {
    //56e05b54db05cf2c175bf2b8 is ici project id, ck is already present
    projectValidator.validate(new Project("ck", "help desk prj", "56e05b54db05cf2c175bf2b8"), function(status) {
          test.equal(status.success, false, "the value of status.success is :" + status.success);
        test.done();
    });

};
module.exports.testProjectWithId = function(test) {
    projectValidator.validate(new Project("xxxxnotpresent", "help desk prj", "56e05b54db05cf2c175bf2b8"), function(status) {
        test.equal(status.success, true, "the value of status.success is :" + status.success);
        test.done();
    });

};