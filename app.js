var application_root = __dirname,
    express = require('express'),
    bodyParser = require('body-parser'),
    rollbar = require('rollbar'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    format = require('util').format,
    path = require("path"),
    port = process.env.PORT || 5000;

var app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.bodyParser());


// Database
mongo_connection = null;
app.configure('production', function () {
    //mongo_connection = 'mongodb://tictactoe:tictactoe@kahana.mongohq.com:10062/app26528232';
    mongo_connection = process.env.MONGOHQ_URL;
    rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN);
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

// Flicker Map stuff
app.get('/flickr-map', function(request, response) {
    response.sendfile(__dirname + '/flickr-map.html');
});

// Method calls to get database objects
getTicTacToeGames = function(callback) {
    collection = mongo.collection('tictactoe');
    collection.find().toArray(function(err, items) {
        if (err) console.error(err.message);
        callback(items);
    });
};

getTicTacToeGame = function(id, callback) {
    collection = mongo.collection('tictactoe');
    var ObjectID = require('mongodb').ObjectID
    //console.log(id.substring(1));
    collection.findOne( { _id: ObjectID.createFromHexString(id.substring(1)) }, function(err, item) {
        callback(item);
    });
};


// "Views"
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

app.post('/tictactoe/api', function (request, response) {
    /* Params:
     * player1
     * player2 */
    console.log(request.body);
    // Don't let an ID property come in.
    if (request.body._id) delete request.body.id
    request.db.collection('tictactoe').save(request.body, function(err, objects) {
        response.send({'game': objects});
    });
    
    console.log(request.body);
    // If it worked, set the header so the address bar doesn't still say /adduser
    //response.location("tictactoe");
    // And forward to success page
    //response.redirect("tictactoe");
});

app.get('/tictactoe/api/:id', function (request, response) {
    getTicTacToeGame(request.params.id, function(item) {
        response.send({'game': item});
    });
});

app.post('/tictactoe/api/:id', function (request, response) {
    if (request.body._id) delete request.body.id
    request.db.collection('tictactoe').update( { _id: new ObjectId(request.params.id) }, { $set: request.body }, function(err){
        getTicTacToeGame(request.params.id, function(item) {
            response.send({'game': item});
        });
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
