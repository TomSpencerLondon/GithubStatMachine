describe('ActivityCalculator', function () {
  var activityCalculator = new ActivityCalculator
  var date = 1510950000
  var additions = 100
  var deletions = -10
  var holidayDate = 1513950000
  var holidayAdditions = 10
  var holidayDeletions = -1
  var weeks = []
  for (var i = 0; i < 52; i ++) {
    if (i >= 48) {
      weeks.push([holidayDate, holidayAdditions, holidayDeletions])
    } else {
      weeks.push([date, additions, deletions])
    }
  }
  
  $.each(weeks, function(index, week) {
    activityCalculator.addRepoActivity(week)
  });

  it('Calculates the average additions for a given repo', function () {
    expect(activityCalculator.returnAdditionsAverage()).toEqual(93)
  });

  it('Calculates the average deletions for a given repo', function () {
    expect(activityCalculator.returnDeletionsAverage()).toEqual(-9)
  });

  it('Calculates the average holiday deletions for a given repo', function () {
    expect(activityCalculator.returnAdditionsHolidayAverage()).toEqual(10)
  });

  it('Calculates the average holiday deletions for a given repo', function () {
    expect(activityCalculator.returnDeletionsHolidayAverage()).toEqual(-1)
  });

});