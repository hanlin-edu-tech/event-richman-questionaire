var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var clean = require("gulp-clean");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var templateUtil = require("gulp-template-util");
var del = require("del");
var Q = require("q");

var basePath = { base: "src" };
var dist = "dist";

var cleanDir = sourceDir => {
  return function() {
    gulp.src(sourceDir).pipe(clean());
  };
};

var copyStaticFile = () => {
  return function() {
    gulp
      .src(["src/**/*.html", "src/js/lib/*.js", "src/audio/*"], basePath)
      .pipe(gulp.dest(dist));
  };
};

var babelJS = sourceJS => {
  return () => {
    gulp.src(sourceJS, basePath).pipe(babel()).pipe(gulp.dest("babel-temp"));
  };
};

var minifyCSS = sourceCss => {
  return () => {
    gulp
      .src(sourceCss, basePath)
      .pipe(cleanCSS({ keepBreaks: true }))
      .pipe(gulp.dest(dist));
  };
};

var minifyImage = sourceImage => {
  return () => {
    gulp
      .src(sourceImage, basePath)
      .pipe(imagemin({ use: [pngquant()] }))
      .pipe(gulp.dest(dist));
  };
};

var minifyJS = sourceJS => {
  return () => {
    gulp
      .src(sourceJS, { base: "babel-temp" })
      .pipe(
        uglify({ mangle: false }).on("error", function(error) {
          console.log(error);
        })
      )
      .pipe(gulp.dest(dist));
  };
};

gulp.task("clean", cleanDir(dist));
gulp.task("cleanBabel", cleanDir("babel-temp"));
gulp.task("copyStaticFile", copyStaticFile(dist));
gulp.task("babelJS", babelJS(["src/js/*.js", "src/js/*module/*.js"]));
gulp.task("minifyCSS", minifyCSS("src/css/*.css"));
gulp.task("minifyImage", minifyImage("src/image/*.png"));
gulp.task("minifyJS", minifyJS("babel-temp/js/**/*.js"));
gulp.task("build", [
  "clean",
  "copyStaticFile",
  "babelJS",
  "minifyCSS",
  "minifyImage",
  "minifyJS"
  // "cleanBabel"
]);

gulp.task("package", function() {
  var deferred = Q.defer();
  Q.fcall(function() {
    return templateUtil.logPromise(cleanDir(dist));
  })
    .then(function() {
      return Q.all([
        templateUtil.logStream(copyStaticFile(dist)),
        templateUtil.logStream(babelJS(["src/js/*.js", "src/js/*module/*.js"]))
      ]);
    })
    .then(function() {
      return Q.all([
        templateUtil.logStream(minifyImage("src/image/*.png")),
        templateUtil.logStream(minifyCSS("src/css/*.css")),
        templateUtil.logStream(minifyJS("babel-temp/js/**/*.js"))
      ]);
    })
    .then(function() {
      return templateUtil.logPromise(cleanDir("babel-temp"));
    });

  return deferred.promise;
});
