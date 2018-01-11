(function (exports) {
  exports.ActivityCalculator = function () {
    
    function repoActivity (data) {
      let result = {
        additions: 0,
        deletions: 0,
        holidayAdditions: 0,
        holidayDeletions: 0
      }
      let weeks = 1
      let holidayWeeks = 1
      addSingleRepoActivity (data, weeks, holidayWeeks, result)
      return result
    };

    function userActivity(allReposActivity) {
      let result = calculateTotalActivity(allReposActivity)
      result.additions = Math.round(result.additions/allReposActivity.length)
      result.deletions = Math.round(result.deletions/allReposActivity.length)
      result.holidayAdditions = Math.round(result.holidayAdditions/allReposActivity.length)
      result.holidayDeletions = Math.round(result.holidayDeletions/allReposActivity.length)
      return result
    }

    function addSingleRepoActivity (data, weeks, holidayWeeks, result) {
      $.each(data, function (index, weeklyActivity) {
        if (isHolidaySeason(weeklyActivity[0])) {
          result.holidayAdditions += weeklyActivity[1]
          result.holidayDeletions += weeklyActivity[2]
          holidayWeeks++
        }
        result.additions += weeklyActivity[1]
        result.deletions += weeklyActivity[2]
        weeks++
      })
      calculateWeeklyAverage(result, weeks, holidayWeeks)
    }

    function calculateWeeklyAverage(result, weeks, holidayWeeks) {
      result.additions = result.additions/weeks
      result.deletions = result.deletions/weeks
      result.holidayAdditions = result.holidayAdditions/holidayWeeks
      result.holidayDeletions = result.holidayDeletions/holidayWeeks
    }

    function calculateTotalActivity(allReposActivity) {
      let result = {
        additions: 0,
        deletions: 0,
        holidayAdditions: 0,
        holidayDeletions: 0
      }
      addEachRepoActivity(result, allReposActivity)
      return result
    }

    function addEachRepoActivity (result, allReposActivity) {
      $.each(allReposActivity, function(index, eachRepoActivity){
        result.additions += eachRepoActivity.additions
        result.deletions += eachRepoActivity.deletions
        result.holidayAdditions += eachRepoActivity.holidayAdditions
        result.holidayDeletions += eachRepoActivity.holidayDeletions
      })
    }

    function isHolidaySeason(unix) {
      let date = new Date(unix*1000);
      let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
      let month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
      if (month == 12 && day > 18) {
        return true
      } else {
        return false
      }
    }

    return {
      repoActivity: repoActivity,
      userActivity: userActivity
    }
  };
})(this);