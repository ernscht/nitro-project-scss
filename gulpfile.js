'use strict';

const gulp = require('gulp');
const getTask = require('./gulp/utils').getTask;
const gulpSequence = require('gulp-sequence').use(gulp);
const config = require('config');
require('nitro-exporter')(gulp, config);

gulp.task('sync-githooks', getTask('sync-githooks'));
gulp.task('minify-img', getTask('minify-img'));
gulp.task('svg-sprite', getTask('svg-sprite'));
gulp.task('copy-assets', getTask('copy-assets'));
gulp.task('assets', ['svg-sprite', 'copy-assets', 'minify-img']);
gulp.task('watch-assets', ['assets'], getTask('watch-assets'));
gulp.task('serve', getTask('serve'));
gulp.task('watch-serve', ['serve'], getTask('watch-serve'));
gulp.task('develop', ['watch-assets', 'watch-serve']);
gulp.task('production', gulpSequence('assets', 'serve'));
gulp.task('dump-views', getTask('dump-views'));
gulp.task('lint-accessibility', ['dump-views'], getTask('lint-accessibility'));
gulp.task('lint-html', ['dump-views'], getTask('lint-html'));
gulp.task('visual-approve', getTask('visual-approve'));
gulp.task('visual-reference', ['assets'], getTask('visual-reference'));
gulp.task('visual-test', ['assets'], getTask('visual-test'));
gulp.task('test', ['assets'], getTask('test'));
gulp.task('watch-test', ['test'], getTask('watch-test'));
