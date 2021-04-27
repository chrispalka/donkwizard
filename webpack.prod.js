const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const DIST_DIR = path.join(__dirname, 'public');


module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'prod.bundle.js',
    path: DIST_DIR,
    publicPath: '/',
  },
});