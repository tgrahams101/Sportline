var express = require ('express');
var app = express(),
mongoose = require ('mongoose'),
bodyParser = require ('body-parser');

var comments = [
{
  body: "Yeah dude Geno is gonna be back and gonna take us to the playoffs this year"
},
{
  body: "Some people think that Kap isn't a Super Bowl quarterback. What do you think"
},
{
  body: "Can't wait for football season"
},
{
  body: "Is Alabama gonna win the College Playoff Championships this year?"
}
];


//CONFIGURE BODYPARSER FOR USE IN app
// app.use(bodyParser.urlencoded({extended: true}));

//PERMIT SERVING OF STATIC FILES FROM PUBLIC FOLDER
// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

//BRING IN THE MONGODB DATABASE AND MODELS VIA MODELS FOLDER
var db = require('./models');

//Allow parsing of body content in requests to server
app.use(bodyParser.urlencoded({ extended: true }));

//SERVER ROUTING FOR HOME Port

app.get('/', function handleHomeGet(req, res){
     res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/posts', function(req, res) {
  db.Post.find().populate('comments').exec(function (err, success){
  res.json(success);
    });
});


app.get('/api/posts/:id', function(req, res) {
  db.Post.findOne({_id: req.params.id}).populate('comments').exec(function (err, success){
  res.json(success);
    });
});

app.post('/api/posts', function (req, res) {
    console.log(req.body.bodypost);
    console.log(req.body.titlepost);

    var newPost = new db.Post({
          title: req.body.bodypost,
          body: req.body.titlepost,
          comments: []
     });
// //TESTING OUT COMMENTS BEGIN
//
//     var commentOne = new db.Comment ({
//         body: req.body.bodypost
//     });
//
//     var commentTwo = new db.Comment ({
//         body: req.body.bodypost
//     });
//
//
//    commentOne.save(function (err, success){
//        if (err){
//          res.sendStatus(500);
//        }
//        console.log("Comment was saved" , success );
//    });
//
//      newPost.comments.push(commentOne, commentTwo);
//
// //END OF TESTING COMMMENTS

     newPost.save(function (err, success){
          if (err){
            res.sendStatus(500);
          }
          res.json(success);
     });

    //
    // newPost =  db.Post.create([{
    //        title: req.body.titlepost,
    //        body: req.body.bodypost
    //   }]);
    //
    //   res.json(newPost);

});

app.put('/api/posts/:id', function(req, res){

    db.Post.findOne({_id: req.params.id}, function (err, success){
        if (err){
            res.send('An error in the making of finding post by id');
          }
        if ((req.body.titlepost.length > 0) && (!req.body.bodypost.length)){
              success.title = req.body.titlepost;
              success.save(function (err, success){
                  if(err){
                    res.send('There was an error in saving');
                  }
                  res.json(success);
              });
        }
        else if ((req.body.bodypost.length > 0) && (!req.body.titlepost.length)){
          success.body = req.body.bodypost;
          success.save(function (err, success){
              if(err){
                res.send('There was an error in saving');
              }
              res.json(success);
          });
        }
        else if ((req.body.bodypost.length > 0) && (req.body.titlepost.length > 0)){
          success.body = req.body.bodypost;
          success.title = req.body.titlepost;
          success.save(function (err, success){
               if(err){
                 res.send('There was an error in saving');
               }
               res.json(success);
          });
        }
        else {
          res.send('YOU MUST ENTER IN AN INPUT!');
        }

    });


});


app.get('/api/custom/:id', function (req, res){
    //  db.Post.findOne({_id: req.params.id }, function (err, Item){
    //       db.Comment.find(function (err, success){
    //           success.forEach(function (object){
    //               object.postId.push(Item);
    //               console.log(object._id + 'was put into the Post: ' + Item._id);
    //           });
    //       });
    //       db.Comment.find().populate('postId').exec(function (err,something){
    //       res.json(something);
    //       console.log('Populated Comments list: ' + something);
    //       });
    //  });


    db.Post.findOne({_id: req.params.id}, function (err, bats){
            // var something = bats;
            // //  res.json(something);
            // db.Comment.findOne({_id: '57940d0c3f4ab0bd3e826380'}, function (err, success){
            //   success.postId.push(something);
            //   success.save(function (err, success){
            //     console.log('happy');
            //     res.json(success);
            //   });
            // });

             db.Comment.find(function (err, success){
                //  res.json(success);
                 success.forEach(function(object){

                    object.postId.push(bats);

                    object.save(function (err, success){
                      console.log('I love dogs and' + bats._id);
                    });
                 });
                 console.log(success);
             });

          // arrayList.forEach(function (object){
          //   object.postId.push(success);
          // });


    });
});



app.delete('/api/posts/:id', function (req, res){

        db.Comment.find({postId: req.params.id}, function (err, success){
          console.log('The following comments will be deleted: ' + success);
          success.forEach(function (object){
              db.Comment.findOneAndRemove({_id: object._id}, function (err, success){
                    if (err){
                      res.sendStatus(500);
                    }
                    console.log("The comment with the following ID was removed: " + success._id);
              });
          });
        });

        db.Post.findOneAndRemove({_id:req.params.id}, function(err, success){
            if (err){
              res.sendStatus(500);
            }
            res.json(success);
            console.log('The following post was removed', success);
        });




});
//TESTING
app.get('/api/customize/:id', function (req, res){
  db.Comment.find({postId: req.params.id}, function (err, success){
    console.log('WE da bast' + success);
    res.json(success);
    });
});


app.get('/api/posts/:selectedpost/comments', function (req, res){
        // db.Post.findOne({_id: req.params.selectedpost}, function (err, success){
              // if (err){
              //   res.sendStatus(500);
              // }
              // // res.json(success.populate('comments'));
              // success.populate('comments').exec(function (err, success){
              //      if (err){
              //        res.sendStatus(500);
              //      }
              //      res.json(success);
              // });
        db.Post.findOne({_id: req.params.selectedpost}).populate('comments').exec(function (err, success){
                if (err){
                  res.sendStatus(500);
                }
                res.json(success.comments);
        });
});

app.post('/api/posts/:selectedpost/comments', function (req, res) {

    db.Post.findOne({_id: req.params.selectedpost}, function (err, success){
              console.log(success);

            //CREATING NEW COMMMENT WITH POSTID REFERENCE
              var newComment = new db.Comment({
                    body: req.body.bodypost,
                    postId: success
                  });
              console.log(newComment);
          //SAVING THE NEW COMMENT IN THE MONGODB DATABASE
              newComment.save(function (err, success){
                if (err){
                  res.sendStatus(500);
                }
                console.log('The following was saved:'+ success);
              });
         //PUSHING THE NEW COMMENT INTO THE POST'S COMMENTS ARRAY
            success.comments.push(newComment);
                console.log(success);
         //SAVING THE UPDATED POST WITH THE NEW COMMMENT INSIDE
              success.save(function (err, success){
                if (err){
                  res.sendStatus(500);
                }
                res.json(success);
                console.log('Success. Comment with the id: ' + newComment._id + ' was successfully saved!');

              });

              // if (err){
              //   res.sendStatus(500);
              // }
              // else if (req.body.bodypost.length > 0){
              //     var newComment = new db.Comment ({
              //       body: req.body.bodypost
              //     });
              //     success.comments.push(newComment);
              //     success.save(function (err, success){
              //     if (err){
              //         res.sendStatus(500);
              //     }
              //         res.json(success).send('Comment saved!');
              //         });
              // }
              // else{
              //   res.send('You must enter in content for a new comment');
              // }

    });
});

app.delete('/api/posts/:selectedpost/comments/:selectedcomment', function (req, res){

          var commentIdForDeletion = req.params.selectedcomment;

        db.Comment.findOneAndRemove({_id: commentIdForDeletion}, function (err, success){
                if (err){
                  res.sendStatus(500);
                }
                res.json(success);
                console.log('Comment:' + success._id + 'was deleted!');
        });
});


app.get('/api/comments', function (req, res){
     db.Comment.find(function (err, success){
       if (err){
         res.sendStatus(500);
       }
       res.json(success);
     });
});

app.get('/api/comments/:id', function (req, res){
    db.Comment.findOne({_id: req.params.id}, function (err, success){
            if (err){
              sendStatus(500);
            }
            res.json(success);
    });

});

app.put('/api/comments/:id', function (req, res){
    db.Comment.findOne({_id: req.params.id}, function (err, success){
            if (err){
              sendStatus(500);
            }
            if (req.body.bodypost.length > 0){
              success.body = req.body.bodypost;
              res.json(success);
              success.save(function (err, success){
                if (err){
                  res.sendStatus(500);
                }
                res.json(success);
              });
            }
            else
            res.send('You must enter content for edit');
    });

});



app.delete('/api/comments/:id', function (req, res){
  db.Comment.findOneAndRemove({_id: req.params.id}, function (err, success){
          if (err){
            sendStatus(500);
          }
          res.json(success);
   });
});

app.put('/api/comments', function (req, res){
     res.status(404).send('You cannot do that!');
   });

//CONFIGURE SERVER TO LISTEN AT THE LOCAL HOST PORT OR EXTERNAL HOSTING
app.listen(3000, function() {
  console.log('We da best! Listening at Port 3000 Over');
});
