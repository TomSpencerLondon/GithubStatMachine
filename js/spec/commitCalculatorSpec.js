describe('CommitCalculator', function () {
  var commitCalculator = new CommitCalculator
    var data = {all: []}
    for (var i = 0; i < 52; i ++) {
      if (i >= 48) {
        data.all.push(5)
      } else {
        data.all.push(10)
      }
    }
    
  it('Calculates the average of a given data set', function () {
    commitCalculator.addRepoCommits(data)
    expect(commitCalculator.returnAverageCommits()).toEqual(10)
  });

  it('Calculates the average holiday period of a given data set', function () {
    expect(commitCalculator.returnHolidayCommits()).toEqual(5)
  });
});