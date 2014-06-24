var application_root = __dirname,
    express = require('express'),
    rollbar = require('rollbar'),
    MongoClient = require('mongodb').MongoClient,
    format = require('util').format,
    path = require("path"),
    port = process.env.PORT || 5000;

var app = express();

rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN);

// Database
mongo_connection = null;
app.configure('production', function () {
    //mongo_connection = 'mongodb://tictactoe:tictactoe@kahana.mongohq.com:10062/app26528232';
    mongo_connection = process.env.MONGOHQ_URL;
});

app.configure('development', function () {
    mongo_connection = 'mongodb://localhost:27017';
});

console.log(mongo_connection);
var mongo = null;
MongoClient.connect(mongo_connection, function(err, db) {
    if (err) {
        rollbar.reportMessage("Mongo connection error: " + err + "; db: " + db);
        console.error(err);
    }
    mongo = db;
})

// Making mongo available on the request
app.use(function(request, response, next) {
    request.db = mongo;
    next();
});


// Requests
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
});


getTicTacToeGames = function(callback) {
    collection = mongo.collection('tictactoe');
    collection.find().toArray(function(err, items) {
        if (err) console.error(err.message);
        callback(items);
    });
};

app.get('/tictactoe', function(request, response) {
    games = getTicTacToeGames(function(games) {
        // If there aren't any games, create one
        if (games.length == 0) {
            collection = request.db.collection('tictactoe');
            collection.insert({}, function(err, objects) {
                if (err) console.warn(err.message);
            });
        }
    });
    response.sendfile(application_root + '/tictactoe.html');
});


app.get('/tictactoe/api', function (request, response) {
    getTicTacToeGames(function(games) {
        response.send({'games': games});
    });
});


app.configure(function() {
    app.use('/', express.static(__dirname + '/'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/javascripts', express.static(__dirname + '/javascripts'));
    app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
    app.use('/sounds', express.static(__dirname + '/sounds'));
});

// Use the rollbar error handler to send exceptions to your rollbar account
app.use(rollbar.errorHandler(process.env.ROLLBAR_ACCESS_TOKEN));

app.listen(port);

//mongo.close()
