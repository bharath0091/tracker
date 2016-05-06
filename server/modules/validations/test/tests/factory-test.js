/**
 * Created by t937426 on 3/22/2016.
 */

var Factory = require('../../factory.js').Factory;

module.exports.testProjectValidator_new_project_validator = function(test) {
    var projectValidator = Factory.produce('new_project_validator');
    test.equal(projectValidator.name, 'NewProjectValidator', "the value of projectValidator.name is :" + projectValidator.name);
    test.done();
};

module.exports.testProjectValidator_update_project_validator = function(test) {
    var projectValidator = Factory.produce('update_project_validator');
    test.equal(projectValidator.name, 'UpdateProjectValidator', "the value of projectValidator.name is :" + projectValidator.name);
    test.done();
};

module.exports.testProjectValidator_Null = function(test) {
    var projectValidator = Factory.produce(null);
    test.equal(projectValidator, null, "the value of projectValidator is :" + projectValidator);
    test.done();
};