// server.js
//https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
//http://jsfiddle.net/CaioToOn/pkxPa/

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var timestamp = require('./routes/timestampRoutes');
    var privdata = require('./config.js')


    // configuration =================

    var PORT = process.env.PORT || 8000;
    app.listen(PORT, function() {
      console.log("Application running on port: ", PORT);
    });

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    app.get('/', function(req, res){
        res.sendfile('./public/index.html');
    })

    app.get('/api/comments/:videoId', timestamp.getComments);
    app.post('/api/comments/new', timestamp.newComment);

    // listen (start app with node server.js) ======================================

mongoose.connect(privdata.mongodbURI);
