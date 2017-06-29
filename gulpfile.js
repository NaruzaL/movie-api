var gulp = require('gulp');  //
var concat = require('gulp-concat');     // npm install gulp-concat --save-dev
var browserify = require('browserify');  //  npm install browserify --save-dev
var source = require('vinyl-source-stream');     // npm install vinyl-source-stream --save-dev
var uglify = require('gulp-uglify');     // npm install gulp-uglify --save-dev
var utilities = require('gulp-util');    //    npm install gulp-util --save-dev
var del = require('del');    //    npm install del --save-dev
var jshint = require('gulp-jshint');     // npm install jshint --save-dev && npm install gulp-jshint --save-dev
var browserSync = require('browser-sync').create(); // npm install browser-sync --save-dev
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var buildProduction = utilities.env.production;
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});



gulp.task('bowerCSS', function() {
    return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bowerJS', function() {
    return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: './',
            index: "index.html"
        }
    });
    gulp.watch(['js/*.js'], ['jsBuild']);
    gulp.watch(['bower.json'], ['bowerBuild']);
    gulp.watch(['*.html'], ['htmlBuild']);
    gulp.watch(["scss/*.scss"], ['cssBuild']);
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('concatInterface', function(){
    return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function(){
    return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
    return gulp.src("./build/js/apps.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function(){
    return del(['build', 'tmp']);
});

gulp.task("build", ['clean'], function(){
    if (buildProduction) {
        gulp.start('minifyScripts');
    } else {
        gulp.start('jsBrowserify');
    }
    gulp.start('bower');
    gulp.start('cssBuild');
});

gulp.task('jshint', function(){
    return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('cssBuild', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});
