var cfg = require('../app/core/config');
var path = require('path');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

function getSourceFiles(ext) {
	var assets = [];

	for (var key in cfg.assets) {
		if (cfg.assets.hasOwnProperty(key) && ext === path.extname(key)) {
			var asset = cfg.assets[key],
				result = {
					name: key,
					deps: [],
					src:  []
				};

			for (var fkey in asset) {
				if (asset.hasOwnProperty(fkey)) {
					var filepath = asset[fkey];
					if (filepath.indexOf('+') === 0) {
						result.deps.push(filepath.substr(1));
					}
					else {
						result.src.push(filepath);
					}
				}
			}

			assets.push(result);
		}
	}

	return assets;
}

function reloadConfig() {
	cfg = cfg.reload();
	return cfg;
}

function getTask(task) {
	return require('./' + task)(gulp, plugins);
}

module.exports = {
	getSourceFiles: getSourceFiles,
	reloadConfig: reloadConfig,
	getTask: getTask
};
