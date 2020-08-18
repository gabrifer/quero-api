const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  startTime: process.env.START_TIME || 540,
  lunchTime: process.env.LUNCH_TIME || 720,
  lunchSize: process.env.LUCH_SIZE || 60,
  endTime: process.env.END_TIME || 1020,
  leastHappyHourTime: process.env.LEAST_HAPPY_HOUR || 960,
  //Extra config keys can go into this file
};
