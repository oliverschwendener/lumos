const gulp = require('gulp');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

const server = browserSync.create();

const sourceFiles = {
    js: './assets/js/lumos.js',
    scss: './assets/scss/lumos.scss',
}

const outputLocations = {
    js: './dist/js',
    css: './dist/css',
}

const filesToWatch = [
    sourceFiles.js,
    sourceFiles.scss,
    './index.html',
    './demo/demo.scss',
];

function buildJs(callback) {
    gulp
        .src(sourceFiles.js)
        .pipe(minify())
        .pipe(gulp.dest(outputLocations.js));

    callback();
}

function buildCss(callback) {
    gulp
        .src(sourceFiles.scss)
        .pipe(sass())
        .pipe(gulp.dest(outputLocations.css));

    callback();
}

function watch() {
    gulp.watch(filesToWatch, gulp.series(buildJs, buildCss, reload));
}

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: './'
        }
    });
    done();
}

exports.dev = gulp.series(serve, watch);
exports.build = gulp.parallel(buildJs, buildCss);