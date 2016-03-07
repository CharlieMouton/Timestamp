var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    comment: String,
    time: Number,
    videoId: String,
    user: String
    });


var comment = mongoose.model('comment', commentSchema);

module.exports = comment;