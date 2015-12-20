var express = require('express');

var app = express();
//To load the middleware function, call app.use(), specifying the middleware function.
// For example, the following code loads the myLogger middleware function before the route to the root path (/).

app.use(function(req, res, next){
    console.log(new Date());
    next();
});//????????????

app.get('/', function (req, res) {
    res.send('Hello World!');
});



app.listen(5000);
console.log("server listening at 5000");