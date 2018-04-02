'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const browserSync = require('browser-sync');

const options = {
    port: 8080,
    open: false,
    reloadOnRestart: true,
    logFileChanges: true,
    server: {
        baseDir: ['./']
    },
    notify: false,
};

const demoFiles = {
    src: './demo/demo.scss',
    out: './demo/demo.css'
}

const sourceFiles = {
    js: './assets/js/lumos.js',
    scss: './assets/scss/**/*.scss',
    html: './index.html'
}

const scriptFilesToConcat = [
    './node_modules/jquery-touchswipe/jquery.touchSwipe.min.js',
    './node_modules/imagesloaded/imagesloaded.pkgd.min.js',
    './assets/js/lumos.js'
];

const destinationFolders = {
    js: './dist/js',
    css: './dist/css',
}

gulp.task('scripts', () => {
    return gulp
        .src(scriptFilesToConcat)
        .pipe(concat('lumos.js'))
        .pipe(minify())
        .pipe(gulp.dest(destinationFolders.js));
});

gulp.task('sass', () => {
    return gulp
        .src('./assets/scss/lumos.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(destinationFolders.css))
        .pipe(browserSync.stream());
});

gulp.task('demo', () => {
    return gulp
        .src('./demo/demo.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./demo'));
});

gulp.task('build', [
    'scripts',
    'sass'
]);

gulp.task('serve', ['build'], () => {
    browserSync(options);
    gulp.watch(sourceFiles.js, ['scripts']).on('change', browserSync.reload);
    gulp.watch(sourceFiles.scss, ['sass']).on('change', browserSync.reload);
    gulp.watch(sourceFiles.html).on('change', browserSync.reload);
    gulp.watch(demoFiles.src, ['demo']).on('change', browserSync.reload);
});
