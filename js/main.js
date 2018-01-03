$(window).ready(function (){
  let githubAccess = new GithubAccess
  let commitCalculator = new CommitCalculator
  let activityCalculator = new ActivityCalculator
  let user = ''

  $('#search-user').on('click', function (e) {
    user = $('#user').val()
    getRepoStats();
    $('#user').val('')
    e.preventDefault()
  });

  function getRepoStats() {
    $.ajax({
      url: 'https://api.github.com/users/'+user+'/repos?per_page=100',
      data: githubAccess.data
    }).done(function(repos){
      displayUser();
      $.each(repos, function(index, repo) {
        getCommitStats(repo);
        getActivityStats(repo);
      });
    });
  }

  function getCommitStats(repo) {
    $.ajax({
      url: 'https://api.github.com/repos/'+user+'/'+repo.name+'/stats/participation',
      data: githubAccess.data
    }).done(function(data){
      commitCalculator.addRepoCommits(data);
      displayCommitData();
    });
  };

  function getActivityStats(repo) {
    $.ajax({
      url: 'https://api.github.com/repos/'+user+'/'+repo.name+'/stats/code_frequency',
    data: githubAccess.data
    }).done(function(data){
      $.each(data, function(index, weeklyActivity){
        activityCalculator.addRepoActivity(weeklyActivity);
        displayActivityData()
      });
    });
  };

  function displayUser() {
    $('#user-name').html(`
    <h5>
      ${user}'s repositories have been added!
    </h5>
    `)
  };

  function displayCommitData() {
    $('#activity-data').html(`
      <div class='row'>
        <div class='col-md-6'>
          <div id='data-card' class='card'>
            <div class='card-header'>
              <h1>Commits</h1>
            </div>
            <div class='card-body'>
              Average Commits <span class='badge badge-primary badge-pill'>${commitCalculator.returnAverageCommits()}</span>
              Holiday Commits <span class='badge badge-primary badge-pill'>${commitCalculator.returnHolidayCommits()}</span>
            </div>
          </div>
        </div>
      </div>
    `)
  };

  function displayActivityData() {
    $('#commit-data').html(`
      <div class='row'>
        <div class='col-md-6'>
          <div id='data-card' class='card'>
            <div class='card-header'>
              <h1>Activity</h1>
            </div>
            <div class='card-body'>
              Average Additions <span class='badge badge-primary badge-pill'>${activityCalculator.returnAdditionsAverage()}</span>
              Average Deletions <span class='badge badge-primary badge-pill'>${activityCalculator.returnDeletionsAverage()}</span>
            </div>
          </div>
        </div>
      </div>
    `)
  };
});

