/**
 * This functios takes an timestamp in the format of HH:MM AM|PM value an covert in a integer
 * @param {string} value
 * @returns {int} converted timestamp to integer
 */
const timeToInt = (value) => {
  const hours = parseInt(value.split(':')[0]);
  const minutes = parseInt(value.split(':')[1].replace('/AM|PM/', ''));
  return hours * 60 + minutes;
};

module.exports = timeToInt;
