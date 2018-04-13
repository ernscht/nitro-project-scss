'use strict';

const config = require('config');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../../config/webpack/webpack.config.prod');
const webpackCompiler = webpack(webpackConfig);
const wpm = webpackMiddleware(webpackCompiler, {
	logLevel: 'warn',
	publicPath: webpackConfig.output.publicPath,
	stats: 'minimal',
});
const wphm = webpackHotMiddleware(webpackCompiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000,
});
const isProduction = config.get('server.production');

module.exports = function (app) {
	if (!isProduction) {
		app.use(wpm);
		app.use(wphm);
	}
};
