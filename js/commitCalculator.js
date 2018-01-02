(function (exports) {
  exports.CommitCalculator = function () {
    let repos = []

    function addRepoCommits (data) {
      const commitHistory = data.all
      repos.push(commitHistory)
    };

    function returnAverageCommits () {
      let sum = 0
      $.each(repos, function (index, commitHistory) {
        sum += commitHistory.reduce((a, b) => a + b, 0);
      })
      return Math.round(sum/52)
    }

    function returnHolidayCommits () {
      let sum = 0
      $.each(repos, function (index, commitHistory) {
        $.each(commitHistory, function (index, weeklyCommits) {
          if (index >= 50) {
            sum += weeklyCommits
          }
        })
      })
      return Math.round(sum/2)
    }

    return {
      addRepoCommits: addRepoCommits,
      returnAverageCommits: returnAverageCommits,
      returnHolidayCommits: returnHolidayCommits
    }
  }
})(this);