const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {

    app.use(
        '/admin',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      ),
      app.use(
        '/author',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/audio',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/genre',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      
    
    
}