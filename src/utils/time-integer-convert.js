/**
 * This functios takes an time in the format of HH:MM AM|PM value an covert in a integer
 * @param {int} value
 */
const timeToInt = (value) => {
  const hours = parseInt(value.split(':')[0]);
  const minutes = parseInt(value.split(':')[1].replace('/AM|PM/', ''));
  return hours * 60 + minutes;
};

module.exports = timeToInt;
