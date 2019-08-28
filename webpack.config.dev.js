const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ["@babel/polyfill", path.join(__dirname, '/public/javascripts/')],
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: `bundle.js`,
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'                                              
    }]
  },
  resolve: {
    extensions: ['.js'],
  },
  watch: true
};