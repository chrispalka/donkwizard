const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const path = require('path');

const SRC_DIR = path.join(__dirname, 'client/src');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      favicon: './client/src/assets/favicon.ico'
    }),
    new NodePolyfillPlugin(),
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
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },
      {
        test: /\.(mp3|gif|png)$/,
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
