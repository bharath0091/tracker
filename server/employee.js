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


//var storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//        cb(null, '/uploads')
//    },
//    filename: function (req, file, cb) {
//        cb(null, file.fieldname + '-' + Date.now())
//    }
//})
//
//var upload = multer({ storage: storage })

var upload = multer({
    dest: 'uploads/',
    //limits: {
    //    fieldNameSize: 50,
    //    files: 1,
    //    fields: 5,
    //    fileSize: 1024 * 1024
    //},
    //rename: function(fieldname, filename) {
    //    return filename;
    //},
    onFileUploadStart: function(file) {
        //if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        //    return false;
        //}
        console.log("file upload start");
    }
});


process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

//TODO why .any?, check use of other methods like .single and find why ut is not working??
router.post('/export', upload.single('employee'), function(req, res) {
    console.log("export ............." + req.files);
    //mongoUtil.getDocuments('employees', {id : req.params.employeeId}, function(data){
    //    var employee = data[0];
    //    mongoUtil.getDocuments('action', {assignedTo : employee.project}, function(data){
    //        employee.actions = data;
    //        console.log("employee with actions : " + JSON.stringify(employee))
    //        res.end(JSON.stringify(employee));
    //    });
    //});
    res.end();
});

module.exports = router;

