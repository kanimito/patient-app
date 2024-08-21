module.exports = {
  devServer: {
    proxy: {
      '/api': { //axios要请求的，name
        target: 'http://192.168.43.214:8083', //target为目标地址
        changeOrigin: true, //开启跨域
        pathRewrite: { //重写路径
          '^/api': '' //按照模板，name
        }
      }
    }
  }
}