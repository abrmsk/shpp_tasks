const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include'); // Для подключения файлов друг в друга

// Таск для сборки HTML и шаблонов
gulp.task('html', function(callback) {
	return gulp.src('./src/html/*.html')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'HTML include',
			        sound: false,
			        message: err.message
				}
			})
		}))
		.pipe( fileinclude({ prefix: '@@' }) )
		.pipe( gulp.dest('./build/') )
	callback();
});

// Таск для компиляции SCSS в CSS
gulp.task('scss', function(callback) {
	return gulp.src('./src/scss/main.scss')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Styles',
			        sound: false,
			        message: err.message
				}
			})
		}))
		.pipe( sourcemaps.init() )
		.pipe( sass() )
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./build/css/') )
	callback();
});

// Следим за картинками Images
gulp.task('copy:img', function (callback) {
	return gulp.src('./src/images/**/*.*')
		.pipe( gulp.dest('./build/images'));
	callback();
})

// Следим за картинками Upload
gulp.task('copy:upload', function (callback) {
	return gulp.src('./src/upload/**/*.*')
		.pipe( gulp.dest('./build/upload'));
	callback();
})

// Следим за JS
gulp.task('copy:js', function (callback) {
	return gulp.src('./src/js/**/*.*')
		.pipe( gulp.dest('./build/js'));
	callback();
})

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {
	// Слежение за HTML и CSS и обновление браузера
	watch(['./src/*.html', './app/css/**/*.css'], gulp.parallel( browserSync.reload ));

	// Слежение за SCSS и компиляция в CSS - обычный способ
	// watch('./app/scss/**/*.scss', gulp.parallel('scss'));

	// Запуск слежения и компиляции SCSS с задержкой, для жесктих дисков HDD
	watch('./src/scss/**/*.scss', function(){
		setTimeout( gulp.parallel('scss'), 1000 )
	})

	// Слежение за HTML и сборка страниц и шаблонов
	watch('./src/html/**/*.html', gulp.parallel('html'))

	// Слежение и копирование статических файлов и скриптов
	watch('./src/images/**/*.*', gulp.parallel('copy:img'))
	watch('./src/upload/**/*.*', gulp.parallel('copy:upload'))
	watch('./src/js/**/*.*', gulp.parallel('copy:js'))
});

// Задача для старта сервера из папки app
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	})
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
// gulp.task('default', gulp.parallel('server', 'watch', 'scss', 'html'));
gulp.task('default',
	gulp.series(
		gulp.parallel('scss', 'html', 'copy:img', 'copy:upload', 'copy:js'),
		gulp.parallel('server', 'watch')
	));
