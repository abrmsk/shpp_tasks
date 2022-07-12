var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProj = ts.createProject("tsconfig.json");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");

var watchify = require("watchify");
var fancy_log = require("fancy-log");

var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

var paths = {
    pages: ["src/html/*.html"],
};

// custom
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');

// copy-html
gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'HTML include',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(fileinclude({prefix: '@@'}))
        .pipe(gulp.dest('./dist'))
});

// javaScript1 - convert ts to js (простой пример)
gulp.task('javaScript1', function () {
    return tsProj.src()
        .pipe(tsProj()).js
        .pipe(gulp.dest('./dist/js'));
});

// javaScript2 - Объединить все наши модули в один файл JavaScript.
gulp.task('javaScript2', function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/js/main.ts"],
        cache: {},
        packageCache: {},
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist/js"));
});

// === autosave ===
// Watchify, Babel и Uglify

// Watchify
var watchedBrowserify = watchify(browserify({
    basedir: ".",
    debug: true,
    entries: ["src/js/main.ts"],
    cache: {},
    packageCache: {},
}).plugin(tsify));

// javaScript3 - auto save, auto compile
gulp.task('javaScript3', function () {
    return watchedBrowserify
        .bundle()
        .on("error", fancy_log)
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist/js"));
});

// javaScript4 - min js + map + auto-compile
// Uglify - цель состоит в том, чтобы искажать ваш код -
// Минимизирует файл js, в одну строчку, убирая все пробелы и переносы
gulp.task('javaScript4', function () {
    return watchedBrowserify
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/js"));
});

// javaScript5 - Babel = min-js + map + auto-compile
gulp.task( 'javaScript5', function () {
    return watchedBrowserify
        .transform("babelify", {
            presets: ["es2015"],
            extensions: [".ts"],
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/js"));
    }
);

gulp.task("default", gulp.series(gulp.parallel("copy-html"), 'javaScript5'));
watchedBrowserify.on("update", gulp.parallel("javaScript5"));
watchedBrowserify.on("log", fancy_log);
