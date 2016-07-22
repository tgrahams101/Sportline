var express = require ('express');
var app = express(),
mongoose = require ('mongoose');

var posts = [
{
  title: "NY Jets Rulez!",
  body: "Geno Smith will be our quarterback this year, I guarantee you that"
},
{
  title: "Can Kaepernick win a Super Bowl?",
  body: "Some people think that Kap isn't a Super Bowl quarterback. What do you think"
}];

//CONFIGURE BODYPARSER FOR USE IN app
// app.use(bodyParser.urlencoded({extended: true}));

//PERMIT SERVING OF STATIC FILES FROM PUBLIC FOLDER
app.use(express.static(__dirname + '/public'));

//BRING IN THE MONGODB DATABASE AND MODELS VIA MODELS FOLDER
var db = require('./models');

//SERVER ROUTING FOR HOME Port

app.get('/', function handleHomeGet(req, res){
     res.sendFile(__dirname + '/index.html');
});

app.get('/api/posts', function(req, res) {
  res.json(posts);
});


//CONFIGURE SERVER TO LISTEN AT THE LOCAL HOST PORT OR EXTERNAL HOSTING
app.listen(3000, function() {
  console.log('We da best! Listening at Port 3000 Over');
});
