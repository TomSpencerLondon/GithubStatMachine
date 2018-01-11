describe('ActivityCalculator', function () {
  var activityCalculator = new ActivityCalculator
  var data = new DataStub
  var activityData = data.activityData
  var repos = [{activityData}]

  it('Calculates the average activity for a given repo', function () {
    expect(activityCalculator.repoActivity(activityData)).toEqual({
      additions: 91.32075471698113,
      deletions: -9.132075471698114,
      holidayAdditions: 8,
      holidayDeletions: -0.8
    })
  });

  it('Calculates the average total activity for a given user', function () {
    let allActivity = []
    for (var i = 0; i < 50; i++) {
      allActivity.push(activityCalculator.repoActivity(activityData))
    } 
    expect(activityCalculator.userActivity(allActivity)).toEqual({
      additions: 91,
      deletions: -9,
      holidayAdditions: 8,
      holidayDeletions: -1
    })
  });
});