var gulp = require('gulp');

var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('flappy-bird/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('flappy-bird/css'));
});

// Minify index
gulp.task('html', function() {
  return gulp.src('flappy-bird/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['scripts']);
});

