const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const NewrelicWebpackPlugin = require('@newrelic/webpack-plugin/lib/NewrelicWebpackPlugin')
const nodeExternals = require('@newrelic/webpack-plugin/lib/externals')

const path = require('path');

const SRC_DIR = path.join(__dirname, 'client/src');
const DIST_DIR = path.join(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  externals: [nodeExternals()],
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
    }),
    new NodePolyfillPlugin(),
    new FaviconsWebpackPlugin('./client/src/assets/favicon.ico'),
    new NewrelicWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|eot|ttf|woff|woff2|ico|)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(mp3|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
};
