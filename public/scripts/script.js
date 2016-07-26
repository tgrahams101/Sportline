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



            $.ajax({

                  method: 'POST',
                  url: '/api/posts',
                  data: $('#newPostForm').serialize(),
                  success: onPostSuccess,
                  error: onPostError
            });

            $('#newPostFormDiv').hide();
              $('#newPostForm').trigger('reset');
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

      $('div').on('click', '#postEditButton', function (event){
            $('#myModal').modal('toggle');

            var id = $(this).closest('.row').data('post-id');
            console.log(id);
            var endpoint = '/api/posts/' + id;
            console.log(endpoint);
            var selectedTitle = $(this).siblings('h2');
            var selectedBody = $(this).siblings('p');

            console.log(selectedTitle[0].innerText);
            console.log(selectedBody);
            $('#editPostForm').on('submit', function (event){
                  event.preventDefault();

                    $.ajax({
                      method: 'PUT',
                      url: endpoint,
                      data: $(this).serialize(),
                      success: onEditSuccess,
                      error: onEditError
                      });
                      $(this).trigger('reset');
                    function onEditSuccess(json) {
                      console.log(json);
                        if ((json.title.length > 0) && (json.body.length > 0)){
                          $('#myModal').modal('hide');
                          selectedTitle[0].innerText = json.title;
                          selectedBody[0].innerText = json.body;


                        }
                        // if ((json.title.length > 0) && (json.body.length > 0)){
                        //   $('#myModal').modal('hide');
                        //   selectedTitle[0].innerText = json.title;
                        //   selectedBody[0].innerText = json.body;
                        //     $(this).trigger('reset');
                        //
                        // }
                        // if ((json.title.length > 0) && (json.body.length > 0)){
                        //   $('#myModal').modal('hide');
                        //   selectedTitle[0].innerText = json.title;
                        //   selectedBody[0].innerText = json.body;
                        //     $(this).trigger('reset');
                        //
                        // }

                        else {
                          console.log('NO GO!!');
                        }

                      }

                    function onEditError() {
                        console.log('Edit Error');
                    }

            });


      });

      $('div').on('click', '#commentEditButton', function (event){
            event.preventDefault();
            $('#editCommentModal').modal('toggle');

            var id = $(this).closest('.row').data('comment-id');
            console.log(id);
            var endpoint = '/api/comments/' + id;
            console.log(endpoint);
            var selectedComment = $(this).siblings('p');


            // console.log(selectedComment[0].innerText);
            console.log(selectedComment);
            $('#editCommentForm').on('submit', function (event){
              event.preventDefault();
              var serializedData = $(this).serialize();
              console.log(serializedData);
              console.log(endpoint);




                    $.ajax({
                      method: 'PUT',
                      url: endpoint,
                      data: $(this).serialize(),
                      success: onEditSuccess,
                      error: onEditError
                      });


                    function onEditSuccess(json) {
                      console.log(json);
                        if (json.body.length > 0){
                          $('#editCommentModal').modal('hide');
                          console.log(selectedComment[0]);
                          console.log(json.body);
                          $(this).trigger('reset');
                          selectedComment[0].innerText = json.body;

                        }

                        else {
                          console.log('NO GO BRO!!');
                        }

                    }


                    function onEditError() {
                        console.log('Edit Error');
                    }

            });

    });

    $('div').on('click', '#commentDeleteButton', function (event){
        event.preventDefault();
        console.log('Delete button clicked');
        var id = $(this).closest('.comment').data('comment-id');
        var divForEmpty = $(this).closest('.comment');
        console.log(id);

        var endpoint = '/api/comments/' + id;
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
