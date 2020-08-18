const generateSession = require('../../src/services/session-service');

const mockInput = [
  {
    title: 'Lecture 1',
    timeAmount: 10,
  },
  {
    title: 'Lecture 2',
    timeAmount: 20,
  },
  {
    title: 'Lecture 3',
    timeAmount: 15,
  },
  {
    title: 'Lecture 4',
    timeAmount: 40,
  },
];

test('generate a session', () => {
  expect(generateSession(300, 500, mockInput)).toEqual([
    '5:00AM Lecture 4',
    '5:40AM Lecture 3',
    '5:55AM Lecture 2',
    '6:15AM Lecture 1',
  ]);
  expect(generateSession(100, 100, mockInput)).toEqual([]);
});
