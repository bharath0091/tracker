/**
 * Created by t937426 on 3/22/2016.
 */

var Factory = require('../../factory.js').Factory;

module.exports.testProjectValidator = function(test) {
    var projectValidator = Factory.produce('project');
    test.equal(projectValidator.name, 'ProjectValidator', "the value of projectValidator.name is :" + projectValidator.name);
    test.done();
};