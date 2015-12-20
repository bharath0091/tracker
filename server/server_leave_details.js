var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));//????????????

console.log(__dirname);


var bodyParser = require('body-parser');
app.use(bodyParser.json());


process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


var mongoutil = require('./modules/mongoutil');
var templateDb = mongoutil('template');
templateDb.connectToServer(
function(err) {
console('connection made successfully');
}
);

console.log(templateDb.getDb());

app.listen(5000);
console.log("server listening at 5000");