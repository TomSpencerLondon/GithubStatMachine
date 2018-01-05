$(window).ready(function () {
  let githubAccess = new GithubAccess
  let user = ''

  $('#search-user').on('click', function (e) {
    commitCalculator = new CommitCalculator
    activityCalculator = new ActivityCalculator
    user = $('#user').val()
    getRepoStats();
    $('#user').val('')
    e.preventDefault()
  });

  function getRepoStats() {
    $.ajax({
      url: 'https://api.github.com/users/' + user + '/repos?per_page=100',
      data: githubAccess.data,
      error: function (_, _, thrownError) {
        alert(thrownError);
      }
    }).done(function (repos) {
      displayUser();
      $.each(repos, function (index, repo) {
        getCommitStats(repo);
        getActivityStats(repo)
      });
    });
  }

  function getCommitStats(repo) {
    $.ajax({
      url: 'https://api.github.com/repos/' + user + '/' + repo.name + '/stats/participation',
      data: githubAccess.data
    }).done(function (data) {
      commitCalculator.addRepoCommits(data);
      displayCommitData();
    });
  };

  function getActivityStats(repo) {
    $.ajax({
      url: 'https://api.github.com/repos/' + user + '/' + repo.name + '/stats/code_frequency',
      data: githubAccess.data
    }).done(function (data) {
      $.each(data, function (index, weeklyActivity) {
        activityCalculator.addRepoActivity(weeklyActivity);
        displayActivityData()
      });
    });
  };

  function displayUser() {
    $.ajax({
      url: 'https://api.github.com/users/' + user,
      data: githubAccess.data
    }).done(function (user) {
      $('#user-profile').html(`
        <div class="card">
          <h2 class="card-header">
            <a href="${user.html_url}">${user.name}</a>
          </h2>
          <div class="card-body">
            <img style="width:100%" src="${user.avatar_url}">
          </div>
        </div>
      `)
    });
  };

  function displayCommitData() {
    $('#activity-data').html(`
      <div id='data-card' class='card'>
        <div class='card-header'>
          <h2>Commits</h2>
        </div>
        <div class='card-body'>
          <ul class='list-group'>
            <li class='list-group-item d-flex justify-content-between align-items-center'>Average Commits <span class='badge badge-primary badge-pill'>${commitCalculator.returnAverageCommits()}</span></li>
            <li class='list-group-item d-flex justify-content-between align-items-center'>Holiday Commits <span class='badge badge-primary badge-pill'>${commitCalculator.returnHolidayCommits()}</span></li>
          </ul>
        </div>
      </div>
    `)
  };

  function displayActivityData() {
    $('#commit-data').html(`
      <div id='data-card' class='card'>
        <div class='card-header'>
          <h2>Activity</h2>
        </div>
        <div class='card-body'>
          <ul class='list-group'>
            <li class='list-group-item d-flex justify-content-between align-items-center'>
              Average Additions 
              <span class='badge badge-primary badge-pill'>
                ${activityCalculator.returnAdditionsAverage()}
              </span>
            </li>
            <li class='list-group-item d-flex justify-content-between align-items-center'>
              Holiday Additions 
              <span class='badge badge-primary badge-pill'>
                ${activityCalculator.returnAdditionsHolidayAverage()}
              </span>
            </li>
          </ul>
          <br>
          <ul class='list-group'>
            <li class='list-group-item d-flex justify-content-between align-items-center'>
              Average Deletions 
              <span class='badge badge-primary badge-pill'>
                ${activityCalculator.returnDeletionsAverage()}
              </span>
            </li>
            <li class='list-group-item d-flex justify-content-between align-items-center'>
              Holiday Deletions 
              <span class='badge badge-primary badge-pill'>
                ${activityCalculator.returnDeletionsHolidayAverage()}
              </span>
            </li>
          </ul>
        </div>
      </div>
    `)
  };
});