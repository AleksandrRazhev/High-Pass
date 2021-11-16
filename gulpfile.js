const { src, dest, series, watch } = require('gulp'),
  concat = require('gulp-concat'),
  htmlMin = require('gulp-htmlmin'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  svgSprite = require('gulp-svg-sprite'),
  image = require('gulp-image'),
  webp = require('gulp-webp'),
  fileInclude = require('gulp-file-include'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify-es').default,
  notify = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass')(require('dart-sass')),
  browserSync = require('browser-sync').create();

const fonts = () => {
  return (src('src/**/*.ttf'))
  .pipe(ttf2woff())
  .pipe(dest('dev'))
  .pipe(dest('build'))
  .pipe(src('src/**/*.ttf'))
  .pipe(ttf2woff2())
  .pipe(dest('dev'))
  .pipe(dest('build'));
};

const clean = () => {
return(del(['dev', 'build']));
};

const resources = () => {
  return(src('src/resources/**'))
    .pipe(dest('dev/resources'))
    .pipe(dest('build/resources'));
};

const compressionCss = () => {
  return (autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }));
};

const compileSass = () => {
  return src('src/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(dest('dev/css'))
    .pipe(src('src/style.scss'))
    .pipe(sass())
    .pipe(compressionCss())
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src('src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(compressionCss())
    .pipe(dest('build/css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/css'))
    .pipe(browserSync.stream());
};

const compilePug = () => {
  return src('src/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: true
     }))
    .pipe(dest('dev'))
    .pipe(src('dev'))
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(dest('build'));
};

const buildHtml = () => {
  return src('src/*.html')
    .pipe(fileInclude())
    .pipe(dest('dev'))
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(dest('build'))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dev/images'))
    .pipe(dest('build/images'));
};

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/*.ico',
    ])
    .pipe(image())
    .pipe(dest('dev/images'))
    .pipe(dest('build/images'))
    .pipe(webp({
      quality: 70
    }))
    .pipe(dest('dev/images'))
    .pipe(dest('build/images'));
};

const scripts = () => {
  return src([
      'src/components/**/*.js',
      'src/js/main.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(concat('app.js'))
      .pipe(uglify({
        toplevel: true
      }).on('error', notify.onError()))
      .pipe(dest('build'))
      .pipe(sourcemaps.write())
      .pipe(dest('dev'))
      .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  });
};

watch('src/**/*.html', buildHtml);
watch('src/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/**/*.js', scripts);
watch('src/rescourses/**', resources);
watch('src/fonts/**/*.ttf', fonts);
watch('src/**/*.pug', compilePug);
watch('src/**/*.scss', compileSass);
watch('src/images/*', images);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.buildHtml = buildHtml;

exports.default = series(clean, resources, fonts, svgSprites, images, scripts, compilePug, buildHtml, compileSass, styles, watchFiles);