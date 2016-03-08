var mongoose = require('mongoose');
var Schema = mongoose.Schema


var commentSchema = mongoose.Schema({
    comment: String,
    time: Number,
    videoId: String,
    user: String
    }, {'collection' : 'Comment'});


var userSchema = mongoose.Schema({
    name: String,
    comments: [{type: Schema.ObjectId, ref:"Comment"}],
    password: String
}, {'collection' : 'User'});


var User = mongoose.model('User', userSchema);
var Comment = mongoose.model('Comment', commentSchema);

module.exports.comment = Comment;
module.exports.user = User;