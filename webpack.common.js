const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtraHooksPlugin = require('event-hooks-webpack-plugin');
const { CallbackTask } = require('event-hooks-webpack-plugin/lib/tasks');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

const { statSync, copySync, readdirSync, readFileSync, writeFileSync } = require('fs-extra');
const { parse, parseAllDocuments } = require('yaml');

function yaml2json(yamlFilePath, jsonFilePath) {
  const yamlContent = readFileSync(yamlFilePath, 'utf-8');
  const parsedYamlContent = parseAllDocuments(yamlContent);
  const jsonContent = JSON.stringify(parsedYamlContent);
  writeFileSync(jsonFilePath, jsonContent);
}

function ls_dir(p) {
  return readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory());
}

function ls_files(p) {
  return readdirSync(p).filter(f => statSync(path.join(p, f)).isFile());
}

function compileTrips() {
  // output to be written at the end
  // of this function
  var output = "";

  // get all directories under src/trips
  var trips_dir = './src/trips/';
  var trip_file = 'trip.yaml';
  const dirs = ls_dir('./src/trips');
  // get the trips file from each dir
  var i;
  for (i = 0; i < dirs.length; i++) {
    var this_trip_dir = path.resolve(__dirname, trips_dir + dirs[i]);
    const yamlContent = readFileSync(this_trip_dir + '/' + trip_file, 'utf-8');
    const parsedYamlContent = parseAllDocuments(yamlContent);
    output += '---\n';
    output += yamlContent;
    output += "entries:\n";
    // now add all entries for this trip to the output
    const trip_entries_dir = this_trip_dir + "/entries/";
    const trip_dir_list = ls_files(path.resolve(__dirname, trip_entries_dir));
    // read each entry yaml file and add it to the output
    var j;
    for (j = 0; j < trip_dir_list.length; j++) {
      if (trip_dir_list[j].endsWith(".yaml")) {
        const entryContent = readFileSync(path.resolve(__dirname, trip_entries_dir + trip_dir_list[j]), 'utf-8');
        output += entryContent;
      }
    }
  }

  // write all content to the JSON file
  const yamlContent = parseAllDocuments(output);
  const jsonContent = JSON.stringify(yamlContent);
  writeFileSync('./src/trips/trips.json', jsonContent);
}

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  watchOptions: {
    ignored: ['./**/*.json'],
    poll: 3
  },
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
    new ExtraHooksPlugin({
      beforeRun: () => compileTrips(),
      watchRun: () => compileTrips()
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist', '!dist/images']
    }),
    new ExtraWatchWebpackPlugin({
      files: [ './**/*.yaml']
    }),
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};
