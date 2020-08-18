const expressLoader = require('../../src/loaders/express');

test('test express loader', () => {
  expect(expressLoader()).toBeDefined();
});
