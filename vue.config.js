const fs = require('fs')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const prettydata = require('pretty-data')

const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'https://hub.asyncy.com'
const paths = ['/', '/services', '/functions', '/apps']

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new SitemapPlugin(url, paths, {
        changeFreq: 'weekly',
        skipGzip: true,
        formatter: xml => prettydata.pd.xml(xml)
      })
    ]
  },
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
