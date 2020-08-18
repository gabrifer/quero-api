const createLoaders = require('./loaders');
const config = require('./config');

const startNodeServer = async (settings = {}) => {
  try {
    //Create all loaders to be loaded
    const loaders = createLoaders() || settings.loaders;

    //Pick the config port to be used or as default 3000
    const port = config.port || 3000;

    console.log('[APP] - Starting App');

    //Return the app instance after all loaders completed
    const app = (await loaders.load()) || settings.app;

    //Start listening
    app.listen(port, (err) => {
      if (err) console.error('[APP] - Error starting node server listener');
      else console.log(`[APP] - Server listening on port ${port}`);
    });

    console.log('[APP] - App started');
  } catch (err) {
    console.error('[APP] - Error starting node server');
    console.error(err);
  }
};

startNodeServer();

module.exports = startNodeServer;
