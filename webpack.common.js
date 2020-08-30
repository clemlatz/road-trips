const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtraHooksPlugin = require('event-hooks-webpack-plugin');
const { CallbackTask } = require('event-hooks-webpack-plugin/lib/tasks');

const { copySync, readFileSync, writeFileSync } = require('fs-extra');
const { parseAllDocuments } = require('yaml');

function yaml2json(yamlFilePath, jsonFilePath) {
  const yamlContent = readFileSync(yamlFilePath, 'utf-8');
  const parsedYamlContent = parseAllDocuments(yamlContent);
  const jsonContent = JSON.stringify(parsedYamlContent);
  writeFileSync(jsonFilePath, jsonContent);
}

function tmp() {
  yaml2json('./src/trips/trips.yaml', './src/trips/trips  .json');
  console.log("Called back");
}

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
        resourceQuery: /stream/,
        options: { asStream: true },
        loader: 'yaml-loader'
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
    new WebpackShellPlugin({
      enforceOrder: true,
      onBuildStart: 'bash ./src/trips/compile.sh',
    }),
    new ExtraHooksPlugin({
      beforeCompile: () => tmp(),
      watchRun: () => tmp()
    }),
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
