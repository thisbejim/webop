var gulp = require("gulp");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
var webserver = require('gulp-webserver');

// compress images
gulp.task('compress', function() {
  return gulp.src('images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

// minify resources
gulp.task('minify-js', ['compress'], function() {
  return gulp.src(['js/perfmatters.js', 'views/js/main.js'])
    .pipe(htmlreplace({
      'pizza-path-one': {src: 'images/pizza.png', tpl: 'pizzaImage.src = "%s";'},
      'pizza-path-two': {src: 'images/pizza.png', tpl: 'elem.src = "%s";'},
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css', ['minify-js'], function() {
  return gulp.src(['css/style.css', 'css/phones.css', 'css/print.css',
                  'views/css/pizza-style.css', 'views/css/bootstrap-grid.css'])
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-html', ['minify-css'], function() {
  return gulp.src(['index.html', 'views/pizza.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

// replace scripts in html with minified versions, minify html
gulp.task('process-index', ['minify-html'], function() {
  gulp.src(['index.html'])
    .pipe(htmlreplace({
        'js': {src: 'js/perfmatters-min.js', tpl: '<script src="%s" async></script>'},
        'link': {src: 'pizza.html', tpl: "<a href='%s'>Cam's Pizzeria</a>"}
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('process-other-html', ['process-index'], function() {
  gulp.src(['project-2048.html', 'project-mobile.html', 'project-webperf.html'])
    .pipe(htmlreplace({
        'js': {src: 'js/perfmatters-min.js', tpl: '<script src="%s" async></script>'}
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('process-pizza', ['process-other-html'], function() {
  gulp.src('views/pizza.html')
      .pipe(htmlreplace({
        'js': {src: 'js/main-min.js', tpl: '<script rel="prefetch" src="%s"></script>'},
        'pizzeria': {src: 'images/pizzeria-300x300.jpg', tpl: "<img src='%s' class='img-responsive'>"},
        'pizza': {src: 'images/pizza.png', tpl: "<img src='%s' class='img-responsive'>"}
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// run all tasks
gulp.task("build", ['process-pizza']);

// serve dist
gulp.task('serve', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'index'
      },
      open: true
    }));
});