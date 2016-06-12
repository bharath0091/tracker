var express = require('express');
var multer = require('multer');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(__dirname + '/public'));


//mongoUtilModule
var mongoUtilModule = require('./modules/mongoutil');
var mongoUtil = mongoUtilModule;
mongoUtil.connectToServer(function(err) {
        console.dir(err);
    }
);

var Factory = require('./modules/validations').Factory;
var Validator = Factory.produce('new_' + 'employee' + '_validator');
var status = require("./modules/domain/status.js");

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

router.post('/export', function(req, res) {
    var formidable = require('formidable');
    var util = require('util');

    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });
    form.on('file', function (name, file){
        var   xlsxj = require("xlsx-to-json");
        xlsxj({
            input: __dirname + '/uploads/' + file.name,
            output: null
        }, function(err, xlEmployees) {
            if(err) {
                console.error(err);
                res.json({"message" : "Error :" + err });
            }else {
                console.log("xlEmployees " + xlEmployees);


                var keys = Object.keys(xlEmployees);
                var validationResults = [];
                var tasksToGo = keys.length;
                if (tasksToGo === 0) {
                    onComplete();
                } else {
                    // There is at least one element, so the callback will be called.
                    keys.forEach(function(key) {
                        var employee = xlEmployees[key];
                        Validator.validate(employee, function(status) {
                            status.message = "For employee with id " + employee.id + " is : " + status.message;
                            validationResults.push(status);
                            if (--tasksToGo === 0) {
                                // No tasks left, good to go
                                onComplete();
                            }
                        });
                    });
                    function onComplete() {
                        console.log("validationResults " + JSON.stringify(validationResults));
                        for (var index = 0; index < validationResults.length; index++) {
                            var success = true;
                            var result = validationResults[index];
                            if(!result.success) {
                                success = false;
                                res.status(400).json(result);
                                break;
                            }
                        }
                        if(success) {
                            mongoUtil.insertDocuments('employee', xlEmployees);
                            res.json(new status(true, 'Import successful'))
                        }
                    }
                }
            }
        });
    });
});

module.exports = router;

