var express = require('express');
var path = require('path');
var User = require(path.join(__dirname,'../models/commentModel')).user;
var Comment = require(path.join(__dirname,'../models/commentModel')).comment;


var router = express.Router();


var users = {};

// ErrorHandler method
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

users.show = function(req, res){
	res.render('login') //Is this old
}

	
users.logout = function(req, res){
	req.logout();
	console.log("logged out")
	res.redirect("/");
}


module.exports = users;
