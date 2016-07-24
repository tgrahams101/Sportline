var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema ({
      title: String,
      body: String,
      comments: [
          {
             type: Schema.Types.ObjectId,
             ref: 'Comment'
          }

      ]
});


var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
