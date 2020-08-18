const scheduleService = require('../../src/services/schedule-service');

const mockInput = [
  {
    title: 'Writing Fast Tests Against Enterprise Rails 60min',
    timeAmount: 60,
  },
  {
    title: 'Overdoing it in Python 45min',
    timeAmount: 45,
  },
  {
    title: 'Lua for the Masses 30min',
    timeAmount: 30,
  },
  {
    title: 'Ruby Errors from Mismatched Gem Versions 45min',
    timeAmount: 45,
  },
];

test('generate schedule', () => {
  expect(scheduleService().generateSchedules(mockInput)).toEqual({
    data: [
      {
        data: [
          '9:00AM Ruby Errors from Mismatched Gem Versions 45min',
          '9:45AM Lua for the Masses 30min',
          '10:15AM Overdoing it in Python 45min',
          '11:00AM Writing Fast Tests Against Enterprise Rails 60min',
          '12:00PM Lunch',
          '16:00PM Networking Event',
        ],
        title: 'Track 1',
      },
    ],
  });
  expect(scheduleService().generateSchedules([])).toEqual({ data: [] });
});
