const intToTime = require('../../src/utils/integer-time-convert');

test('convert integer value to time value', () => {
  expect(intToTime(720)).toBe('12:00PM');
  expect(intToTime(0)).toBe('00:00AM');
  expect(intToTime(540)).toBe('9:00AM');
  expect(intToTime(990)).toBe('16:30PM');
});
