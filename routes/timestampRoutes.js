var express = require('express');
var path = require('path');
var Comment = require(path.join(__dirname,'../models/commentModel')).comment;
var User = require(path.join(__dirname,'../models/commentModel')).user;

var timestamp = {};

timestamp.getComments = function(req, res){

	var vidId = req.params.videoId;
	console.log(req.user, "req.user");
	console.log(vidId)
	Comment.find({videoId: vidId}, function(err, commentList){
		if(err){
			res.send(err);
		}
		console.log(commentList)
		res.json({commentList:commentList, username:req.user.name});
	});

}

timestamp.newComment = function(req, res){
	console.log("received object: ", req.body);
	Comment.create(req.body, function(err, newComment){
		if(err){
			res.send(err);
		}

		res.json(newComment);
	});
};



module.exports = timestamp;
