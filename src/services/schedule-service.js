const intToTime = require('../utils/integer-time-convert');
const timeToInt = require('../utils/time-integer-convert');
const generateSession = require('./session-service');
const config = require('../config');

const secheduleService = () => {
  const generateSchedules = (lectures) => {
    //Create tracks until we have remaning lectures
    let result = { data: [] };
    let trackIdx = 1;
    let happyHourTime = config.leastHappyHourTime;

    while (lectures.length > 0) {
      const trackTimeline = [
        //Generate morning session
        ...generateSession(config.startTime, config.lunchTime, lectures),

        //Include some lunch in between
        `${intToTime(config.lunchTime)} Lunch`,

        //Generate afternoon session
        ...generateSession(
          config.lunchTime + config.lunchSize,
          config.endTime,
          lectures
        ),
      ];

      //Update happy hour time if needed
      const lastEventTime = timeToInt(trackTimeline.slice(-1)[0].split(' ')[0]);
      const lastEventDuration =
        trackTimeline.slice(-1)[0].split(' ').pop() === 'lightning'
          ? 5
          : parseInt(trackTimeline.slice(-1)[0].split(' ').pop());

      happyHourTime =
        lastEventTime + lastEventDuration > happyHourTime
          ? lastEventTime + lastEventDuration
          : happyHourTime;

      //Store track name
      result.data.push({ title: `Track ${trackIdx}`, data: trackTimeline });
      trackIdx++;

      //happyHourTime = result.data[trackIdx - 1];
    }

    //Attach happy hour to the end of all tracks
    result.data.forEach(({ data }) =>
      data.push(`${intToTime(happyHourTime)} Networking Event`)
    );

    return result;
  };

  return {
    generateSchedules,
  };
};

module.exports = secheduleService;
