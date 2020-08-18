const expressLoader = require('./express');

const loaders = (async = (settings = {}) => {
  const load = async () => {
    try {
      console.log('[LOADERS] - Running loader files');

      //Load express app
      const app = await expressLoader();

      //Extra loaders can come here! e.g: database loader

      console.log('[LOADERS] - Loader files runned');

      return app;
    } catch (err) {
      console.error('[LOADERS] - Error running loader files');
      console.error(err);
    }
  };

  return {
    load,
  };
});

module.exports = loaders;
