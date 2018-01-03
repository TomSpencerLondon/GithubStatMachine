(function (exports) {
  exports.ActivityCalculator = function () {
    
    let additionsSum = 0
    let deletionsSum = 0
    let holidayAdditionsSum = 0
    let holidayDeletionsSum = 0
    let weeks = 0
    let holidayWeeks = 0

    function addRepoActivity(week) {
      let date = week[0]
      let additions = week[1]
      let deletions = week[2]
      if (isHolidaySeason(date) === true) {
        holidayAdditionsSum += additions
        holidayDeletionsSum += deletions
        holidayWeeks += 1
      }
      additionsSum += additions
      deletionsSum += deletions
      weeks += 1
    }

    function returnAdditionsAverage() {
      return Math.round(additionsSum/weeks)
    }

    function returnDeletionsAverage() {
      return Math.round(deletionsSum/weeks)
    }

    function returnAdditionsHolidayAverage() {
      return Math.round(holidayAdditionsSum/holidayWeeks)
    }

    function returnDeletionsHolidayAverage() {
      return Math.round(holidayDeletionsSum/holidayWeeks)
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
      addRepoActivity: addRepoActivity,
      returnAdditionsAverage: returnAdditionsAverage,
      returnDeletionsAverage: returnDeletionsAverage,
      returnAdditionsHolidayAverage: returnAdditionsHolidayAverage,
      returnDeletionsHolidayAverage: returnDeletionsHolidayAverage
    }
  };
})(this);