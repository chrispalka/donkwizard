const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const DIST_DIR = path.join(__dirname, 'public');


module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].dev.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  devtool: "inline-source-map",
});