var db = require('./models');

var posts = [
{
  title: "NY Jets Rulez!",
  body: "Geno Smith will be our quarterback this year, I guarantee you that"
},
{
  title: "Can Kaepernick win a Super Bowl?",
  body: "Some people think that Kap isn't a Super Bowl quarterback. What do you think"
},
{
  title: "Is Cam Newton the dabbing King?",
  body: "Dab on 'em fools"
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
