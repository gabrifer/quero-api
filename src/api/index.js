const Router = require('express');
const lectures = require('./routes/lectures');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  lectures(app);

  return app;
};
