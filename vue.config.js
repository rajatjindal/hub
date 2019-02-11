const fs = require('fs')

module.exports = {
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
