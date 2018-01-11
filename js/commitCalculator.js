(function (exports) {
  exports.CommitCalculator = function () {

    function returnAverageCommits (data) {
      let repos = []
      let sum = 0
      addRepoCommits(data, repos)
      $.each(repos, function (index, commitHistory) {
        if (commitHistory != undefined) {
          sum += commitHistory.reduce((a, b) => a + b, 0);
        }
      })
      return Math.round(sum/52/repos.length*100)/100
    }

    function returnHolidayCommits (data) {
      let repos = []
      let sum = 0
      addRepoCommits(data, repos)
      $.each(repos, function (index, commitHistory) {
        $.each(commitHistory, function (index, weeklyCommits) {
          if (index >= 50) {
            sum += weeklyCommits
          }
        })
      })
      return Math.round(sum/2/repos.length*100)/100
    }

    function addRepoCommits (data, repos) {
      console.log(data)
      const commitHistory = data.all
      repos.push(commitHistory)
    };

    return {
      returnAverageCommits: returnAverageCommits,
      returnHolidayCommits: returnHolidayCommits
    }
  }
})(this);