// Minimalist NodeJS and Express application

var http    = require('http');
var express = require('express');


var app = express();


app.get('/', function (request, response) {
    response.send('Welcome to the simplest web application.');
});


var server = http.createServer(app);
server.listen(8000);
