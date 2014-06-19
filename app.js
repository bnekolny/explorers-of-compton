var express = require('express');
var port = process.env.PORT || 5000;
var app = express.createServer();

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
}).configure(function() {
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/javascripts', express.static(__dirname + '/javascripts'));
    app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
}).listen(port);
