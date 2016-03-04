var mongoose = require('mongoose');

var toDoSchema = mongoose.Schema({
    text: String,
    completed: Boolean
    });


var toDo = mongoose.model('toDo', toDoSchema);

module.exports = toDo;