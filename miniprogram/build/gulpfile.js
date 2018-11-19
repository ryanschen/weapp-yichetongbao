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
const cSrc = path.join(__dirname, '../components/dev');
const cDist = path.join(__dirname, '../components/dist');
const ext = ['js', 'stylus', 'json', 'wxml'];

function copy(ext) {
  return gulp.src([src + '/**/*.' + ext]).pipe(gulp.dest(dist));
}
function cCopy(ext) {
  return gulp.src([cSrc + '/**/*.' + ext]).pipe(gulp.dest(cDist));
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
gulp.task('c-compile-stylus', () => {
  return gulp
    .src([cSrc + '/**/*.stylus'])
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
    .pipe(gulp.dest(cDist));
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
gulp.task('c-compile-js', () =>
  gulp
    .src([cSrc + '/**/*.js'])
    .pipe(babel())
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest(cDist))
);

gulp.task('compile-json', () => copy('json'));
gulp.task('c-compile-json', () => cCopy('json'));
gulp.task('compile-wxml', () => copy('wxml'));
gulp.task('c-compile-wxml', () => cCopy('wxml'));
gulp.task('build', [
  ...ext.map(ext => 'compile-' + ext),
  ...ext.map(ext => 'c-compile-' + ext)
]);
gulp.start('build');

ext.forEach(ext => {
  gulp.watch(src + '/**/*.' + ext, ['compile-' + ext]);
  gulp.watch(cSrc + '/**/*.' + ext, ['c-compile-' + ext]);
});
