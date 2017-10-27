var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var del          = require('del');

// File paths
var DIST_PATH    = 'dist';
var SCSS_PATH    = 'src/scss/**/*.scss';
var HTML_PATH    = './*.html';

// SASS
gulp.task('styles', function() {
  console.log('Starting styles task');

  return gulp.src(SCSS_PATH)
             .pipe(plumber(function(err) {
               console.log('Styles Task Error!');
               console.log(err);
               this.emit('end');
             }))
             .pipe(sourcemaps.init())
             .pipe(autoprefixer())
             .pipe(sass({
               outputStyle: 'compressed'
             }))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(DIST_PATH))
             .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  console.log('Starting HTML task');

  return gulp.src(HTML_PATH)
             .pipe(plumber(function(err) {
               console.log('HTML Task Error');
               console.log(err);
               console.log('end');
             }))
             .pipe(livereload());
});

// Clean
gulp.task('clean', function() {
  console.log('Starting clean task');

  return del.sync([
    DIST_PATH
  ]);
});

// Default
gulp.task('default', ['clean', 'styles', 'html'], function() {
  console.log('Starting default task');
});

// Watch
gulp.task('watch', ['default'], function() {
  console.log('Starting watch task');

  require('./server.js');
  livereload.listen();
  gulp.watch(SCSS_PATH, ['styles']);
  gulp.watch(HTML_PATH, ['html']);
});
