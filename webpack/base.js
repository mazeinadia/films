const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const indexCssPath = path.join(__dirname, '..', 'src', 'index.pcss');

module.exports = {

  context: path.join(__dirname, '..', 'src'),
  entry: {
    index: './index.js',
  },
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: '[name].js',
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      showErrors: true,
    }),
    new MiniCssExtractPlugin({
      filename: './[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(pcss|css)$/,
        exclude: path.join(__dirname, '..', 'src', 'index.pcss'),
        use: [
          'to-string-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: path.join(__dirname, '..', 'src', 'index.pcss'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          'to-string-loader',
          'html-loader',
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', { targets: { chrome: 67 } }],
          ],
        },
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }],
      },
    ],
  },
};
