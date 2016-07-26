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

    $('#newPostButton').on('click', function (postEvent){
         $('#newPostButton').hide();
        $('#newPostFormDiv').show();
        $('#newPostCancelButton').on('click', function (event){
              $('#newPostFormDiv').hide();
              $('#newPostButton').show();
        });

      });

  $('#newPostForm').on('submit', function (event){
            event.preventDefault();
            $('#newPostButton').show();
            $('#newPostForm').trigger('reset');


            $.ajax({

                  method: 'POST',
                  url: '/api/posts',
                  data: $('#newPostForm').serialize(),
                  success: onPostSuccess,
                  error: onPostError
            });

            $('#newPostFormDiv').hide();
    });

    $('div').on('submit', '#newCommentForm', function (event){

              event.preventDefault();
              console.log('Comment form');
            var id = $(this).closest('.post').data('post-id');
            console.log(id);

            var commentSpan = $(this).siblings('span');

            var endpoint = '/api/posts/' + id +'/comments';
            console.log(endpoint);

              $.ajax({

                    method: 'POST',
                    url: endpoint,
                    data: $(this).serialize(),
                    success: onCommentSuccess,
                    error: onCommentError
              });

              function onCommentSuccess(json){




                   console.log('Comment logged');
                   commentSpan.append(json.body + '<hr />');

              }

             $(this).trigger('reset');



      });

      $('div').on('click', '#postDeleteButton', function (event){
          event.preventDefault();
          console.log('Delete button clicked');
          var id = $(this).closest('.post').data('post-id');
          var divForEmpty = $(this).closest('.post');
          console.log(id);

          var endpoint = '/api/posts/' + id;
          console.log(endpoint);

          $.ajax({

              method: 'DELETE',
              url: endpoint,
              data: $(this).serialize(),
              success: onPostDeleteSuccess,
              error: onPostDeleteError
            });

          function onPostDeleteSuccess () {
              divForEmpty.empty();
          }

          function onPostDeleteError () {
              console.log('Error in deletion of post');

          }


      });

      $('#postEditButton').on('click', function (event){


      })



});





function display(object) {
  // console.log(object);
  var source = $('#postTemplate').html();
  var template = Handlebars.compile(source);
  var postHTML = template(object);
  $('#postsDiv').prepend(postHTML);

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


function onPostSuccess(jsonObject) {
  //  allPosts = json;
  //  display();
  console.log(jsonObject);
  console.log('allo');
    if (jsonObject=='You must enter in input for title and body'){

      console.log('No marbles!');

    }
    else{
      display(jsonObject);
    }
      $('#newPostFormDiv').hide();
}

function onPostError (){
  console.log('Error!');
  $('#newPostFormDiv').hide();
}




function onCommentError (){
  console.log('Error');
}
