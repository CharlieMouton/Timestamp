var express = require('express');
var path = require('path');
var ToDo = require(path.join(__dirname,'../models/toDoModel'));

var toDos = {};

toDos.getAll = function(req, res){
	ToDo.find({}, function(err, todos){
		if(err){
			res.send(err);
		}

		res.json(todos);
	});
}

toDos.add = function(req, res){
	var text = req.body.text;
	var newToDo = new ToDo({text:text, completed: false});
	newToDo.save(function(err, savedtoDo){
		if(err){
			res.send(err);
		}
		ToDo.find({}, function(err, todos){
			res.json(todos);
		})
	})
}

toDos.move = function(req, res){
	var id = req.params.toDo_id;
	ToDo.find({_id:id}, function(err, toDo){
		if(toDo[0].completed === true){
			toDo[0].completed = false;
		}else{
			toDo[0].completed = true;
		}
		toDo[0].save(function(err, todo){
			ToDo.find({}, function(err, toDos){
			res.json(toDos);
			})
		})
	})
}

toDos.edit = function(req, res){
	var id = req.params.toDo_id;
	var text = req.body.text;
	console.log(req.body);
	ToDo.update({_id: id}, {$set: {text: text}}, function(err, record){
		ToDo.find({}, function(err, toDos){
			res.json(toDos);
		})
	})
}

toDos.remove = function(req, res){
	var id = req.params.toDo_id;
	ToDo.remove({_id:id}, function(err, toDo){
		ToDo.find({}, function(err, toDos){
		res.json(toDos);
		})
	})
	
}

module.exports = toDos;
