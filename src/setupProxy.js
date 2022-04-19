const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/baseApi', {
      target: 'http://localhost:9600',
      changeOrigin: true,
      pathRewrite: {
        '^/baseApi': ''
      }
    })
  );
  app.use(
    proxy('/futuApi', {
      target: 'http://localhost:9601/',
      changeOrigin: true
    })
  );
};
