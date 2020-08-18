const lecturesParser = require('../../src/utils/lecturer-parser');

const mockInput = {
  data: [
    'Writing Fast Tests Against Enterprise Rails 60min',
    'Overdoing it in Python 45min',
    'Lua for the Masses 30min',
    'Ruby Errors from Mismatched Gem Versions 45min',
  ],
};

test('testing lectures input parser', () => {
  expect(lecturesParser(mockInput.data)).toEqual([
    {
      title: 'Writing Fast Tests Against Enterprise Rails 60min',
      timeAmount: 60,
    },
    {
      title: 'Overdoing it in Python 45min',
      timeAmount: 45,
    },
    {
      title: 'Lua for the Masses 30min',
      timeAmount: 30,
    },
    {
      title: 'Ruby Errors from Mismatched Gem Versions 45min',
      timeAmount: 45,
    },
  ]);
  expect(lecturesParser([])).toEqual([]);
});
