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
  let repos = [{}]

  it('Calculates the average activity for a given repo', function () {
    expect(activityCalculator.repoActivity(weeks)).toEqual({
      additions: 91.32075471698113,
      deletions: -9.132075471698114,
      holidayAdditions: 8,
      holidayDeletions: -0.8
    })
  });

  it('Calculates the average total activity for a given user', function () {
    let allActivity = []
    allActivity.push(activityCalculator.repoActivity(weeks))
    allActivity.push(activityCalculator.repoActivity(weeks))
    expect(activityCalculator.userActivity(allActivity)).toEqual({
      additions: 91,
      deletions: -9,
      holidayAdditions: 8,
      holidayDeletions: -1
    })
  });

  // it('Calculates the average holiday deletions for a given repo', function () {
  //   expect(activityCalculator.returnAdditionsHolidayAverage()).toEqual(10)
  // });

  // it('Calculates the average holiday deletions for a given repo', function () {
  //   expect(activityCalculator.returnDeletionsHolidayAverage()).toEqual(-1)
  // });

});