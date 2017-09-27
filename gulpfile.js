'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const browserSync = require('browser-sync');
const zip = require('gulp-zip');

const options = {
    port: 8080,
    open: false,
    reloadOnRestart: true,
    logFileChanges: true,
    server: {
        baseDir: ['./']
    }
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
    zip: './zip'
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

gulp.task('zip', () => {
    return gulp
        .src([
            `${destinationFolders.js}/**/*.js`,
            `${destinationFolders.css}/**/*.css`
        ])
        .pipe(zip('lumos-latest.zip'))
        .pipe(gulp.dest(destinationFolders.zip));
});

gulp.task('demo', () => {
    return gulp
        .src('./demo/demo.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./demo'));
});

gulp.task('build', [
    'scripts',
    'sass',
    'zip'
]);

gulp.task('serve', ['build'],() => {
    browserSync(options);
    gulp.watch(sourceFiles.js, ['scripts']).on('change', browserSync.reload);
    gulp.watch(sourceFiles.js, ['styles']).on('change', browserSync.reload);
    gulp.watch(sourceFiles.html).on('change', browserSync.reload);
    gulp.watch(demoFiles.src, ['demo']).on('change', browserSync.reload);
    gulp.watch([sourceFiles.js, sourceFiles.scss], ['zip']);
});
