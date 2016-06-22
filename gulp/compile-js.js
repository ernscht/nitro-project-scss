var utils = require('./utils');
var Promise = require('es6-promise').Promise;
var browserSync = utils.getBrowserSyncInstance();

module.exports = function (gulp, plugins) {
	return function () {
		var assets = utils.getSourcePatterns('js');
		var promises = [];

		assets.forEach(function (asset) {
			
			promises.push(new Promise(function(resolve) {
				gulp.src(asset.src, {base: '.'})
					.pipe(plugins.plumber())
					.pipe(plugins.sourcemaps.init({loadMaps: true}))
					.pipe(plugins.jshint())
					.pipe(plugins.jshint.reporter('jshint-stylish'))
					.pipe(plugins.concat(asset.name))
					.pipe(plugins.sourcemaps.write('.'))
					.pipe(gulp.dest('public/assets/js'))
					.on('end', function () {
						resolve();
					})
					.pipe(browserSync.stream());
			}));
		});

		return Promise.all(promises);
	};
};

