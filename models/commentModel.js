var mongoose = require('mongoose');
var Schema = mongoose.Schema


var commentSchema = mongoose.Schema({
    comment: String,
    time: Number,
    videoId: String
    });


var userSchema = mongoose.Schema({
    name: String,
    comments: [{type: Schema.ObjectId, ref:"comment"}],
    password: String
});


var User = mongoose.model('User', userSchema);
var comment = mongoose.model('comment', commentSchema);

module.exports.comment = comment;
module.exports.user = User;