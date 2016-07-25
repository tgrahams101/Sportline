var db = require('./models');

var posts = [
{
  title: "NY Jets Rulez!",
  body: "Geno Smith will be our quarterback this year, I guarantee you that",
  comments: []
},
{
  title: "Can Kaepernick win a Super Bowl?",
  body: "Some people think that Kap isn't a Super Bowl quarterback. What do you think",
  comments: []
},
{
  title: "Is Cam Newton the dabbing King?",
  body: "He sure is. Dab on 'em fools",
  comments: []
},
{
  title: "I enjoy college football more",
  body: "Idk but I like college football alot more than the NFL. I love cheering for my college team! Go Cardinal!",
  comments:[]
}];

var comments = [
{
  body: "Yeah dude Geno is gonna be back and gonna take us to the playoffs this year"
},
{
  body: "Some people think that Kap isn't a Super Bowl quarterback. What do you think"
},
{
  body: "Can't wait for footall season"
},
{
  body: "Is Alabama gonna win the College Playoff Championships this year?"
}
];




db.Post.remove({}, function (err, success) {
  if (err) {
    console.log('failed to remove posts');
  } else {
    console.log('Removed all posts');

    db.Post.create(posts, function (err, success){
      if (err){
        return console.log('Error in creating new set of posts', err);
      }
      console.log(success.length + "posts were created");
      process.exit();
    });

  }
});
