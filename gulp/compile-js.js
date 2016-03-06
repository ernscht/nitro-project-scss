var utils = require('./utils');
var Promise = require('es6-promise').Promise;
var browserSync = require('browser-sync');

module.exports = function (gulp, plugins) {
	return function () {
		var assets = utils.getSourceFiles('.js');
		var promises = [];

		assets.forEach(function (asset) {
			
			promises.push(new Promise(function(resolve) {
				gulp.src(asset.src)
					.pipe(plugins.plumber())
					.pipe(plugins.jshint())
					.pipe(plugins.jshint.reporter('jshint-stylish'))
					.pipe(plugins.concat(asset.name))
					.pipe(gulp.dest('public/assets/js'))
					.on('end', function () {
						resolve();
					})
					.pipe(browserSync.reload({stream: true}));
			}));
		});

		return Promise.all(promises);
	};
};

