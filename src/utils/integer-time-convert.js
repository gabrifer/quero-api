/**
 * This functios takes an integer value an covert in a HH:MM AM|PM timestamp
 * @param {int} value
 * @returns {string} HH:MM AM|PM timestamp
 */
const intToTime = (value) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours == 0 ? '00' : hours}:${minutes == 0 ? '00' : minutes}${
    hours >= 12 ? 'PM' : 'AM'
  }`;
};

module.exports = intToTime;
