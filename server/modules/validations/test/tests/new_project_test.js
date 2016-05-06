var projectValidator = require('../../new_project_validator.js');

var Project = function(name, description) {
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
    projectValidator.validate(new Project("ck", "help desk prj"), function(status) {
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
module.exports.testEmptyIDProject = function(test) {
    projectValidator.validate(new Project("kk", "help desk prj"), function(status) {
        test.equal(status.success, true, "the value of status.success is :" + status.success);
        test.done();
    });
};