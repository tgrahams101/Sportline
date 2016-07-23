var express = require ('express');
var app = express(),
mongoose = require ('mongoose'),
bodyParser = require ('body-parser');



//CONFIGURE BODYPARSER FOR USE IN app
// app.use(bodyParser.urlencoded({extended: true}));

//PERMIT SERVING OF STATIC FILES FROM PUBLIC FOLDER
app.use(express.static(__dirname + '/public'));

//BRING IN THE MONGODB DATABASE AND MODELS VIA MODELS FOLDER
var db = require('./models');

//Allow parsing of body content in requests to server
app.use(bodyParser.urlencoded({ extended: true }));

//SERVER ROUTING FOR HOME Port

app.get('/', function handleHomeGet(req, res){
     res.sendFile(__dirname + '/index.html');
});

app.get('/api/posts', function(req, res) {
  db.Post.find(function (err, success){
  res.json(success);
    });
});


app.get('/api/posts/:id', function(req, res) {
  db.Post.findOne({_id: req.params.id}, function (err, success){
  res.json(success);
    });
});

app.post('/api/posts', function (req, res) {
    console.log(req.body.bodypost);
    console.log(req.body.titlepost);

    var newPost = new db.Post({
          title: req.body.bodypost,
          body: req.body.titlepost
     });

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

app.delete('/api/posts/:id', function (req, res){
    db.Post.findOneAndRemove({_id:req.params.id}, function(err, success){
        if (err){
          res.sendStatus(500);
        }
       res.json(success);
    });


});


//CONFIGURE SERVER TO LISTEN AT THE LOCAL HOST PORT OR EXTERNAL HOSTING
app.listen(3000, function() {
  console.log('We da best! Listening at Port 3000 Over');
});
