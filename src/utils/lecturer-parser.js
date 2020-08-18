/**
 * This function will get the inputted lecture data and parse it in a array of object like { title, timeAmount }
 * @param {array} lectures
 * @returns {array} Array contaning the parsed lectures
 */
const lecturesParser = (lectures) => {
  return lectures.map((lecture) => {
    const lectureTime = lecture.split(' ').pop();
    if (lectureTime == 'lightning')
      return {
        title: lecture,
        timeAmount: 5,
      };
    else
      return {
        title: lecture,
        timeAmount: parseInt(lectureTime.replace('min', '')),
      };
  });
};

module.exports = lecturesParser;
