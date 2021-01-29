module.exports = {
  publicPath:'./',
  outputDir:'dist',
  assetsDir:'static',
  devServer: {
    //host: '192.168.0.201', // can be overwritten by process.env.HOST
    host: '127.0.0.1',
    port: 9092, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    disableHostCheck: true,
    // proxy: {//跨域
    //   '/api': {
    //     target: 'http://xxxx/device/', 
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  lintOnSave: false   // 取消 eslint 验证
};
