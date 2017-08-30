'use strict';

const config = {
	assets: {
		'app.css': [
			'+assets/css/example/variables.scss',
			'+assets/css/example/mixins.scss',
			'assets/css/example/reset.css',
			'assets/css/basic.scss',
			'patterns/**/css/*.scss',
			'patterns/**/css/modifier/*.scss',
		],
		'app.js': [
			'node_modules/babel-polyfill/dist/polyfill.min.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/terrific/dist/terrific.min.js',
			'node_modules/handlebars/dist/handlebars.runtime.min.js',
			'assets/js/*.js',
			'patterns/**/js/*.js',
			'patterns/**/js/decorator/*.js',
			'patterns/**/template/*.js',
			'patterns/**/template/partial/*.js',
		],
	},
};

module.exports = config.assets;
