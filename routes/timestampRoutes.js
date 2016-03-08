var express = require('express');
var path = require('path');
var Comment = require(path.join(__dirname,'../models/commentModel')).comment;
var User = require(path.join(__dirname,'../models/commentModel')).user;
console.log(Comment)

var timestamp = {};

timestamp.getComments = function(req, res){

	var vidId = req.params.videoId;
	console.log(vidId)
	Comment.find({}, function(err, commentList){
		if(err){
			res.send(err);
		}
		console.log(commentList)
		res.json(commentList);
	});
	// Comment.create({comment:"haha thats so funnt", time:10, videoId: "PfwwCpAy0-0", user: "Annabel"}, function(err, comment){
	// 	if(err){
	// 		console.log(err)
	// 		res.send(err);
	// 	}
	// 	console.log(comment);
	// })

}

// timestamp.newComment = function(req, res){
// 	Comment.create({req.body}, function(err, newComment){
// 		if(err){
// 			res.send(err);
// 		}

// 		res.json(newComment);
// 	})
// });



module.exports = timestamp;
