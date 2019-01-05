var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source'),
    browserSync = require('browser-sync');

//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

//CONVERTE INKY
gulp.task('inky', ['styles'], function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'));
});

//WATCH
gulp.task('default', function() {
    gulp.watch(['./scss/*.scss', './templates/**/*.html'],['inky']);
});

gulp.task('watch', function() {
    gulp.watch('**/*.*').on('change', function () {
        browserSync.reload();
    });
});

gulp.task('connect-sync', function() {
    browserSync({
        proxy: '127.0.0.1:3000'
    });
});
