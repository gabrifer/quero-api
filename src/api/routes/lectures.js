const router = require('express');
const route = router();
const middlewares = require('../middlewares');
const schedule = require('../../services/schedule-service');
const scheduleService = schedule();

module.exports = (app) => {
  //All routes under this file will be prefixed with /lectures
  app.use('/lectures', route);

  route.post(
    '/schedule',
    middlewares.parseInputtedLectures,
    (req, res, next) => {
      const lectures = req.body;

      //Call the service to generate the schedules
      const schedules = scheduleService.generateSchedules(lectures.data);

      res.json(schedules).status(200);
    }
  );
};
