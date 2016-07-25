console.log('Get it!');

var allPosts = [];
var template;
// var $postsDiv;

$(document).ready(function(){
  console.log('yeah');

    //SETTING UP POSTS SECTION AND HANDLEBARS TEMPLATE
    $postsDiv = $('#postsDiv');
    // var source = $('#postTemplate').html();
    // template = Handlebars.compile(source);

    $.ajax({

        method: 'GET',
        url: '/api/posts',
        // dataType: 'json',
        success: onSuccess,
        error: onError
    });





});

function display(object) {
  console.log(object);
  var source = $('#postTemplate').html();
  var template = Handlebars.compile(source);
  var postHTML = template(object);
  $('#postsDiv').append(postHTML);

  }


function onSuccess(jsonArray) {
  //  allPosts = json;
  //  display();
  console.log('success');
      jsonArray.forEach(function (object){
           display(object);
      });

}

function onError (){
  console.log('Error!');
}
