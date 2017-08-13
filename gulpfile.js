var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var templateUtil = require("gulp-template-util");
var del = require("del");
var Q = require("q");

var basePath = { base: "src" };
var dest = "dist";

var clean = () => {
  return del([dest]);
};

var copyStaticFile = () => {
  return function() {
    return gulp
      .src(["src/**/*.html", "src/js/lib/*.js", "src/audio/*"], basePath)
      .pipe(gulp.dest(dest));
  };
};

var babelJS = sourceJS => {
  return () => {
    gulp.src(sourceJS, basePath).pipe(babel()).pipe(gulp.dest("babel-temp"));
  };
};

var minifyCSS = sourceCss => {
  return () => {
    return gulp
      .src(sourceCss, basePath)
      .pipe(cleanCSS({ keepBreaks: true }))
      .pipe(gulp.dest(dest));
  };
};

var minifyImage = sourceImage => {
  return () => {
    return gulp
      .src(sourceImage, basePath)
      .pipe(imagemin({ use: [pngquant()] }))
      .pipe(gulp.dest(dest));
  };
};

var minifyJS = sourceJS => {
  return () => {
    return gulp
      .src(sourceJS, { base: "babel-temp" })
      .pipe(
        uglify({ mangle: false }).on("error", function(error) {
          console.log(error);
        })
      )
      .pipe(gulp.dest(dest));
  };
};

gulp.task("clean", clean);
gulp.task("copyStaticFile", copyStaticFile("dist"));
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
]);

// gulp.task("package", function() {
//   var deferred = Q.defer();
//   Q.fcall(function() {
//     return util.logPromise(clean);
//   })
//     .then(function() {
//       return Q.all([
//         util.logStream(copyStaticFile("dist")),
//         util.logStream(babelJS(["src/js/*.js", "src/js/*module/*.js"]))
//       ]);
//     })
//     .then(function() {
//       return Q.all([
//         util.logStream(minifyImage("src/image/*.png")),
//         util.logStream(minifyCSS("src/css/*.css")),
//         util.logStream(minifyJS("babel-temp/js/**/*.js"))
//       ]);
//     });

//   return deferred.promise;
// });
