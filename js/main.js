$(window).ready(function (){
  let githubAccess = new GithubAccess
  let commitCalculator = new CommitCalculator
  let user = ''
  let repos = []

  $('#search-user').on('click', function (e) {
    user = $('#user').val()

    $.ajax({
      url: 'https://api.github.com/users/'+user+"/repos?per_page=100",
      data: githubAccess.data
    })
    .done(function(repos){
      $.each(repos, function(index, repo){
        repos.push(repo)
      });
    });
    $('#commit-data').html(`
      <div class="row">
        <div class="col-md-6">
          <button id="calculate-commits" class="btn btn-outline-success my-2 my-sm-0" type="submit">Calculate Commits</button>
        </div>
      </div>
    `)
    $('#user').val('')
    e.preventDefault()
  });

  $('calculate-commits').on('click', function () {
    $.each(repos, function(index, repo) {
      $.ajax({
        url: 'https://api.github.com/repos/'+user+"/"+repo+"/stats/participation",
        data: githubAccess.data
      })
      .done(function(data){
        commitCalculator.addRepoCommits(data);
      });
    });
  });
});
