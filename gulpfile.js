"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var minify = require("gulp-minify");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var browserSync = require("browser-sync");gulp 

var options = {
    port: 8080,
    open: false, // don't open new tab in browser,
    reloadOnRestart: true,
    logFileChanges: true,
    server:{
        baseDir: ["./"]
    }
};

var reload = browserSync.reload;

var filesToWatch = [
    "./assets/js/**/*.js",
    "./assets/scss/**/*.scss",
    "./css/**/*.css",
    "./index.html"  
];

var scriptFilesToConcat = [
    "./assets/js/jquery.touchSwipe.min.js",
    "./assets/js/imagesloaded.pkgd.min.js",
    "./assets/js/lumos.js"
];

var scriptFile = "lumos.js";
var scriptDestFolder = "./js"

var sassFileToCompile = "./assets/scss/lumos.scss";
var cssDestFolder = "./css";


gulp.task("scripts", function(){
    return gulp
        .src(scriptFilesToConcat)
        .pipe(concat(scriptFile))
        .pipe(minify())
        .pipe(gulp.dest(scriptDestFolder));
});

gulp.task("sass", function(){
    return gulp
        .src(sassFileToCompile)
        .pipe(sass().on("error", sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(cssDestFolder))
        .pipe(browserSync.stream());
});

gulp.task("serve", function(){
    browserSync(options);
    gulp.watch(filesToWatch, ["scripts", "sass"]).on("change", reload); 
});
