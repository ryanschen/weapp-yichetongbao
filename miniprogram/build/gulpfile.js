const path = require('path');
const postcss = require('gulp-postcss');
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib')();
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const cssnano = require('cssnano');

const src = path.join(__dirname, '../views');
const dist = path.join(__dirname, '../pages');
const ext = ['js', 'stylus', 'json', 'wxml'];

function copy(ext) {
  return gulp.src([src + '/**/*.' + ext]).pipe(gulp.dest(dist));
}

gulp.task('compile-stylus', () => {
  return gulp
    .src([src + '/**/*.stylus'])
    .pipe(stylus(
      {
        use: nib
      }
    ))
    .pipe(postcss([
      cssnano({
        preset: ['default', {
          normalizeWhitespace: false
        }]
      })
    ]))
    .pipe(
      rename(path => {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest(dist));
});

gulp.task('compile-js', () =>
  gulp
    .src([src + '/**/*.js'])
    .pipe(babel())
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest(dist))
);

gulp.task('compile-json', () => copy('json'));
gulp.task('compile-wxml', () => copy('wxml'));
gulp.task('build', ext.map(ext => 'compile-' + ext));
gulp.start('build');

ext.forEach(ext => {
  gulp.watch(src + '/**/*.' + ext, ['compile-' + ext]);
});
