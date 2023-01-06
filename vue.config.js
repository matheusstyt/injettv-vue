module.exports = {
  devServer : {
    proxy: {
      '^/upload': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '^/idw': {
        target: process.env.API_URL,
        changeOrigin: true,
        logLevel: 'debug',
      },
      'server/path/idw': {
        target: process.env.API_URL,
        changeOrigin: true,
        logLevel: 'debug',
      },
  }
}
}