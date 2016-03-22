var projectValidator = require('../../project.js');

var Project = function(name, description) {
    this.name = name;
    this.description = description;
}

module.exports.testNullProject = function(test) {
    var status = projectValidator.validate(null);
    test.equal(status.success, false, "the value of status.success is :" + status.success);
    test.done();
};

module.exports.testCorrectProject = function(test) {
    var status = projectValidator.validate(new Project("help desk", "help desk prj"));
    test.equal(status.success, true, "the value of status.success is :" + status.success);
    test.done();
};
module.exports.testUndefinedProject = function(test) {
    var status = projectValidator.validate();
    test.equal(status.success, false, "the value of status.success is :" + status.success);
    test.done();
};
module.exports.testUndefinedProjectName = function(test) {
    var status = projectValidator.validate(new Project(undefined, "help desk prj"));
    test.equal(status.success, false, "the value of status.success is :" + status.success);
    test.done();
};
module.exports.testEmptyProjectName = function(test) {
    var status = projectValidator.validate(new Project("", "help desk prj"));
    test.equal(status.success, false, "the value of status.success is :" + status.success);
    test.done();
};
module.exports.testWhiteSpaceProjectName = function(test) {
    var status = projectValidator.validate(new Project(" ", "help desk prj"));
    test.equal(status.success, false, "the value of status.success is :" + status.success);
    test.done();
};
