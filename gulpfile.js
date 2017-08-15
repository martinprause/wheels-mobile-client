var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

var paths = {
  sass: './scss/**/*.scss'
};

gulp.task('default', ['sass']);

gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix:'.min'
    }))
    .pipe(gulp.dest('./www/css'))
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('serve:before', ['default','watch']);
gulp.task('run:before', ['default']);
