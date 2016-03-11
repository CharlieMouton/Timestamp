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
    var login = require('./routes/login');

    // var privdata = require('./config.js')
    var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var path = require('path');
var User = require(path.join(__dirname,'./models/commentModel.js')).user;
var Comment = require(path.join(__dirname,'./models/commentModel.js')).comment;

//auth

var auth = require('./auth');

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    var name = profile.displayName;
    User.find({name: name}, function(err, user){
            if(user.length ===0){
                var newUser = new User({name:name, twotes:[]})
                newUser.save(function(err, user){
                    console.log(newUser)
                    done(null, user);
                })
            } else {
            console.log(name, "SESSON USER")
            console.log(user)
            done(null, user[0]);
            }
        })

}));

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function(username, password, done) {
        console.log(username)

        User.findOne({ name: username }, function (err, user) {
          if(!user){
                var newUser = new User({name:username, comments:[], password:password})
                newUser.save(function(err, user){
                        console.log(newUser, 'newUser')
                        done(null, user);
                    })
            } else if (user.password === password) {
                done(null, user);
                console.log("logged in")
            } else {
                done(null,false);
                console.log("NOPE");
            }
    });
  }
));


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
    app.use(session({ secret: 'this is not a secret ;)',
    resave: false,
     saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

        passport.serializeUser(function(user, done) {
        console.log(user);
      done(null, user._id);
    });

    passport.deserializeUser(function(userid, done) {
        User.findOne({_id:userid}, function(err, user){
            done(err, user);
        })
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/local', passport.authenticate('local'));

    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: '/#/home',
                                          failureRedirect: '/#/login' })
    );

    app.post('/loginLocal',
  passport.authenticate('local', { failureRedirect: '/#/login' }),
  function(req, res) {
    res.redirect('/#/home');
  });


    app.get('/user', ensureAuthenticated, function(req, res) {
      res.send(req.user);
    })

    app.get('/', function(req, res){
        res.sendfile('./public/index.html');
    })

    app.get('/api/comments/:videoId', timestamp.getComments);
    app.post('/api/comments/new', timestamp.newComment);
    app.post('/api/logout', login.logout);
    app.get('/api/pageLoad', timestamp.currentUser);
    // app.get('/api/randVid', timestamp.randVid);


    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
        res.redirect("/#/home");
    }

    // listen (start app with node server.js) ======================================
mongoose.connect(auth.mongodbURI, function(err){ if(err){console.log(err)}});
