var application_root = __dirname,
    express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    format = require('util').format,
    path = require("path"),
    port = process.env.PORT || 5000;

var app = express();

// Database

var mongo = null;
MongoClient.connect('mongodb://tictactoe:bc64c5cb9171f5f562697926ba32d8ea@kahana.mongohq.com:10062/app26528232', function(err, db) {
    mongo = db;
})


app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
});

app.configure(function() {
    app.use('/', express.static(__dirname + '/'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/javascripts', express.static(__dirname + '/javascripts'));
    app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
    app.use('/sounds', express.static(__dirname + '/sounds'));
});

app.listen(port);
