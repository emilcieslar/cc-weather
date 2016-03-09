var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var jsPaths = [
  'scripts/app.js',
  'scripts/services/*.js',
  'scripts/directives/*.js',
  'scripts/controllers/*.js'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
  return gulp.src(jsPaths)
    .pipe($.sourcemaps.init())
    .pipe($.concat('WeatherApp.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['sass', 'scripts'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['scripts/**/*.js'], ['scripts']);
});
