var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/sportline");







module.exports.Post = require ('./post.js');
module.exports.Comment = require ('./comment.js');
