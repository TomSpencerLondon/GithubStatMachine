$(window).ready(function (){
  $('#search-user').on('click', function (e) {
    let user = $('#user').val()
    
    $.ajax({
      url: 'https://api.github.com/users/'+user,
      data: GithubAccess.data
    }).done(function(user){
      console.log(user.name)
    });
    e.preventDefault()
  })
});