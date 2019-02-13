const fs = require('fs')

module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('./src/assets/base.scss')
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
}
