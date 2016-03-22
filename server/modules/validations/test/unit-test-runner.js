/**
 * Created by t937426 on 3/22/2016.
 */
//var ProjectValidator = require('./unit-test-runner.js');
//var projectValidator = new ProjectValidator();
//var status = projectValidator.validate("aaa");
//console.assert(status, null);
//
//
//var status2 = projectValidator.validate("aaa");
//console.assert(status2, null);

var reporter = require('nodeunit').reporters.default;

process.chdir(__dirname);
reporter.run(['tests']);