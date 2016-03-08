var express = require('express');
var path = require('path');
var Comment = require(path.join(__dirname,'../models/commentModel'));

var timestamp = {};

timestamp.getComments = function(req, res){
	var vidId = req.params.videoId;
	Comment.find({videoId: vidId}, function(err, commentList){
		if(err){
			res.send(err);
		}
		res.json(commentList);
	});
}

timestamp.newComment = function(req, res){
	Comment.create(req.body, function(err, newComment){
		if(err){
			res.send(err);
		}

		res.json(newComment);
	})
};



module.exports = timestamp;
