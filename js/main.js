$(window).ready(function (){
  let githubAccess = new GithubAccess
  let commitCalculator = new CommitCalculator
  let user = ''

  $('#search-user').on('click', function (e) {
    user = $('#user').val()
    getRepoStats();
    $('#user').val('')
    e.preventDefault()
  });

  function getRepoStats() {
    $.ajax({
      url: 'https://api.github.com/users/'+user+"/repos?per_page=100",
      data: githubAccess.data
    }).done(function(repos){
      displayUser();
      $.each(repos, function(index, repo) {
        getCommitStats(repo)
      });
    });
  }

  function getCommitStats(repo) {
    $.ajax({
      url: 'https://api.github.com/repos/'+user+"/"+repo.name+"/stats/participation",
      data: githubAccess.data
    }).done(function(data){
      commitCalculator.addRepoCommits(data);
      displayData();
    });
  }

  function displayUser() {
    $('#user-name').html(`
    <h5>
      ${user}'s repositories have been added!
    </h5>
    `)
  };

  function displayData() {
    $('#commit-data').html(`
      <div class="row">
        <div class="col-md-6">
          <div id="data-card" class="card">
            <div class="card-header">
              Average Commits <span class="badge badge-primary badge-pill">${commitCalculator.returnAverageCommits()}</span>
              Holiday Commits <span class="badge badge-primary badge-pill">${commitCalculator.returnHolidayCommits()}</span>
            </div>
          </div>
        </div>
      </div>
    `)
  };

});

