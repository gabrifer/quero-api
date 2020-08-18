const knapsackHelper = require('../../src/utils/knapsack-helper');

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

test('knapsack 0-1 test algorithm output', () => {
  expect(knapsackHelper(mockInput, 40)).toEqual([1, 0]);
  expect(knapsackHelper(mockInput, 0)).toEqual([]);
  expect(knapsackHelper(mockInput, 85)).toEqual([3, 2, 1, 0]);
});
