const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api');

const expressLoader = async (settings = {}) => {
  try {
    console.log('[EXPRESS LOADER] - Loading express app settings');

    //Creates express app
    const app = express();

    //Enable CORS
    app.use(cors());

    //Help on logging HTTP calls
    app.use(require('morgan')('dev'));

    //Middleware that parses req.body in JSON
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Load all routes from the server
    //Prefixes all the calls in the API with /api
    app.use('/api', routes());

    //Extra Middlewares can be added here!

    console.log('[EXPRESS LOADER] - Express app settings loaaded');

    return app;
  } catch (err) {
    console.error('[EXPRESS LOADER] - Error loading express app');
    console.error(err);
  }
};

module.exports = expressLoader;
