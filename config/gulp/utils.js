'use strict';

const config = require('config');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
let browserSync;

function getBrowserSyncInstance() {
	const name = `Nitro${config.get('server.port')}`;
	if (config.get('nitro.mode.livereload') && !browserSync) {
		browserSync = require('browser-sync').create(name);
	}
	return browserSync;
}

function getTask(task) {
	return require('./' + task)(gulp, plugins);
}

function getTmpDirectory(subPath) {
	let tmpPath = 'project/tmp';
	if (subPath && typeof subPath === 'string') {
		tmpPath += `/${subPath}`;
	}
	return tmpPath;
}

module.exports = {
	getBrowserSyncInstance,
	getTask,
	getTmpDirectory,
};
