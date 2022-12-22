module.exports = {
  devServer : {
    proxy: {
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