var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
      body: String,
      postId: [{
      type: Schema.Types.ObjectId,
      ref:'Post'
    }]
});


var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
