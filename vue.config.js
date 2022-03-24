/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
// const url = 'http://1.117.251.254:8888'
const url = 'http://127.0.0.1:8888'
const githubURL = 'https://www.github.com'
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: '/',
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    port:8080,
    proxy: {
      '/api': {
        target: url,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/github': {
        target: githubURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/github': ''
        }
      }
    }
  }
}
