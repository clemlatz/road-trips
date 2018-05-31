const merge = require('webpack-merge');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  serve: {
    add: (app, middleware, options) => {
      app.use(convert(history()));
    },
  }
});
