const { resolve } = require('path')
const webpack = require('webpack')
const nodeModules = {}
const { dependencies } = require('../package.json')
Object.keys(dependencies).forEach(mod => {
  nodeModules[mod] = `commonjs ${mod}`
})

module.exports = {
  context: resolve(__dirname, '../'),
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../dist')
  },
  entry: { server: resolve(__dirname, '../src/server/index.ts') },
  resolve: {
    extensions: ['.js', '.ts', 'tsx']
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  externals: nodeModules
}
