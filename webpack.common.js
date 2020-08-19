const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[hash:6].js',
    chunkFilename: 'bundle.[name].[chunkhash:6].js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['react-hot-loader/babel', 'transform-class-properties'],
          }
        }
      },
      {
        test: /\.yaml$/,
        type: 'json',
        use: [
          { loader: 'yaml-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist', '!dist/images']
    }),
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};



