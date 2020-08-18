const lecturesParser = require('../../utils/lecturer-parser');

const parseInputtedLectures = (req, res, next) => {
  try {
    //Parse the inputted lectures
    req.body.data = lecturesParser(req.body.data);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = parseInputtedLectures;
