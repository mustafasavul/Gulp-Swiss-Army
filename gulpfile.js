// Mustafa Savul Front-End Swiss Army Gulp Tasks

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const {series} = require('gulp');
const usemin = require('gulp-usemin');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const terser = require('gulp-terser');

function style() {
  return gulp.src('./assets/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/styles/'))
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
    startPath: 'index.html'
  });

  gulp.watch('./assets/styles/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./app/**/*.js').on('change', browserSync.reload);
}

function deleteDistFolder() {
  return del('./dist');
}

function minify() {
  return gulp.src('./*.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return terser()}],
    }))
    .pipe(gulp.dest('./dist'));
}

function copyAssets() {
  return gulp.src(['./assets/fonts/**/*', './assets/images/**/*'], {base:'assets'})
    .pipe(gulp.dest('./dist/assets'));
}

exports.style = style;
exports.watch = watch;
exports.build = series(deleteDistFolder, copyAssets, minify);
