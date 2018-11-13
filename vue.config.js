const fs = require('fs')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('./src/styles/index.scss'),
        includePaths: ['./src/styles']
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
}
