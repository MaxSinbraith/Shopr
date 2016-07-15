'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // run our local server for development
var open = require('gulp-open'); // Open our default browser
var browserify = require('browserify'); // Bundle JS and  lets us use the Co..
var reactify = require('reactify'); // transpile our JSX to JS
var source = require('vinyl-source-stream'); // use conventional text stream ..
var concat = require('gulp-concat'); // concatenate our files

var config = {
	port: 8062,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './client/src/*.html',
		js: [
			'./client/src/**/*.js',
		],
		mainjs: './client/src/main.js',
		images: './client/src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/bootstrap-theme.min.css',
			'node_modules/toastr/build/toastr.css',
      './css/Header.css'
		],
		fonts: [
			'node_modules/bootstrap/dist/fonts/glyphicons-halflings-*',
		],
		dist: './dist'
	}
};
// setup for our dev server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// depends on connect task, and will auto run default browser
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Take html files from src directory and put them in dist dir then refresh
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

// take css files from src, bundle them and put them in dist dir then refresh
gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('fonts', function() {
	gulp.src(config.paths.fonts)
		.pipe(gulp.dest(config.paths.dist + '/fonts'));
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload);
});

gulp.task('js', function() {
	browserify(config.paths.mainjs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
});

//gulp.task('default', ['html', 'css', 'js', 'images', 'open', 'watch']);
gulp.task('default', ['html', 'css', 'fonts', 'js', 'watch']);
