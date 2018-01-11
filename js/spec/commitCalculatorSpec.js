describe('CommitCalculator', function () {
  var commitCalculator = new CommitCalculator
  var data = new DataStub
  var commitData = data.commitData
  it('Calculates the average of a given data set', function () {
    expect(commitCalculator.returnAverageCommits(commitData)).toEqual(2.25)
  });

  it('Calculates the average holiday period of a given data set', function () {
    expect(commitCalculator.returnHolidayCommits(commitData)).toEqual(1)
  });
});