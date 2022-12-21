module.exports = {
  devServer : {
    proxy: {
      '^/idw': {
        target: 'http://170.10.0.208:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
      'server/path/idw': {
        target: 'http://170.10.0.208:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
  }
}
}