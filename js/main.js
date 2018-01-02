$(window).ready(function (){
  $('#search-user').on('click', function (e) {
    let user = $('#user').val()
    
    $.ajax({
      url: 'https://api.github.com/users/'+user+"/repos?per_page=100",
      data: GithubAccess.data
    }).done(function(repos){
      $.each(repos, function(index, repo){
        let repoName = repo.name
        $.ajax({
          url: 'https://api.github.com/repos/'+user+"/"+repoName,
          data: GithubAccess.data
        }).done(function(repo){
          console.log(repo.name)
        })
      });
    });
    e.preventDefault()
  })
});