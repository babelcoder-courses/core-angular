const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: { server: './index.js' },
  resolve: { extensions: ['.js'] },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader' }]
  }
};
