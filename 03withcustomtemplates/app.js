// NodeJS and Express application
// With templating capabilities

var http    = require('http');
var express = require('express');

var app = express();

var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', function (request, response) {
    var context = {
        randomNum1: Math.random(),
        randomNum2: Math.random(),
        randomNum3: Math.random()
    };

    response.render('index.html', context);
});

var server = http.createServer(app);
server.listen(8000);
