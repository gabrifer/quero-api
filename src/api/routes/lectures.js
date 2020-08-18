const router = require('express');
const route = router();
const middlewares = require('../middlewares');
const schedule = require('../../services/schedule-service');
const scheduleService = schedule();

module.exports = (app) => {
  app.use('/lectures', route);

  route.post(
    '/schedule',
    middlewares.parseInputtedLectures,
    (req, res, next) => {
      const lectures = req.body;

      const schedules = scheduleService.generateSchedules(lectures.data);

      res.json(schedules).status(200);
    }
  );
};
