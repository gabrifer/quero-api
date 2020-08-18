const timeIntegerConverter = require('../../src/utils/time-integer-convert');

test('convert time to integer', () => {
  expect(timeIntegerConverter('12:00PM')).toBe(720);
  expect(timeIntegerConverter('00:00AM')).toBe(0);
  expect(timeIntegerConverter('9:00AM')).toBe(540);
  expect(timeIntegerConverter('16:30PM')).toBe(990);
});
