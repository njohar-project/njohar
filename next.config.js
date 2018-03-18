const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withTypescript = require('@zeit/next-typescript')

function resolveBaseUrl() {
  if (!process.env.PORT || process.env === '80') {
    return process.env.BASE_URL
  }

  return `${process.env.BASE_URL}:${process.env.PORT}`
}

module.exports = withCSS(
  withLess(
    withTypescript({
      webpack: config => {
        const webpack = require('webpack')
        config.plugins.push(
          new webpack.DefinePlugin({
            __BASE_URL__: `"${resolveBaseUrl()}"`,
            __GQL_END_POINT__: `"${process.env.GQL_END_POINT}"`
          })
        )
        return config
      }
      // transpileModules: [/antd\/.*/]
    })
  )
)
