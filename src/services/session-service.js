const lectureSelector = require('../utils/knapsack-helper');
const intToTime = require('../utils/integer-time-convert');

const generateSession = (startTime, endTime, lectures) => {
  const timeRange = endTime - startTime;
  const selectedLectures = lectureSelector(lectures, timeRange);

  let sessionTimeline = [];
  let currentTime = startTime;

  selectedLectures.forEach((idx) => {
    sessionTimeline.push(`${intToTime(currentTime)} ${lectures[idx].title}`);
    currentTime += lectures[idx].timeAmount;
  });

  selectedLectures.forEach((idx) => lectures.splice(idx, 1));

  return sessionTimeline;
};

module.exports = generateSession;
