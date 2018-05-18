'use strict';

/**
 * Main Project Config
 * https://www.npmjs.com/package/config
 */

const extend = require('extend');
const baseConfig = require('../app/core/config');
const defaultConfig = {
	code: {
		validation: {
			eslint: {
				live: true,
			},
			htmllint: {
				live: true,
			},
			jsonSchema: {
				live: true,
				logMissingSchemaAsError: false,
				logMissingSchemaAsWarning: true,
			},
			stylelint: {
				live: true,
			},
		},
	},
	nitro: {
		patterns: require('./default/patterns'),
		mode: {
			livereload: true,
			offline: false,
		},
		watch: {
			partials: true,
			throttle: {
				base: 1000,
				cache: 3000,
			},
		},
	},
	server: {
		port: 8080,
		proxy: 8081,
	},
	feature: {
		i18next: {
			middlewareOptions: {
				ignoreRoutes: ['api/', 'assets/', 'dist/', 'content/'],
			}
		},
		dumpViews: {
			// filter corrupt, incomplete or irrelevant views
			// example:
			// viewFilter: (url) => url !== 'incomplete',
		},
		svgSprite: {
			// generates icon sprite with the name of the last folder in src
			// src: 'src/patterns/atoms/icon/img/icons/*.svg',
			// dest: 'public/assets/svg',
		},
		minifyImg: {
			// copies and minifies all source images to dest folder
			// src: 'src/shared/assets/img/**/*',
			// dest: 'public/assets/img',
		},
	},
	exporter: require('./default/exporter'),
};

const config = extend(true, {}, baseConfig, defaultConfig);

module.exports = config;
