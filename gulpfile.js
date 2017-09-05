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
var dist = "dist";

var clean = sourceDir => {
  var task_clean = () => {
    return del([sourceDir]);
  };
  return task_clean;
};

var copyStaticFile = () => {
  var task_copyStaticFile = () => {
    return gulp
      .src(["src/**/*.html", "src/js/lib/*.js", "src/audio/*"], basePath)
      .pipe(gulp.dest(dist));
  };
  return task_copyStaticFile;
};

var babelJS = sourceJS => {
  var task_babelJS = () => {
    return gulp
      .src(sourceJS, basePath)
      .pipe(babel())
      .pipe(gulp.dest("babel-temp"));
  };
  return task_babelJS;
};

var minifyImage = sourceImage => {
  var task_minifyImage = () => {
    return gulp
      .src(sourceImage, basePath)
      .pipe(imagemin({ use: [pngquant()] }))
      .pipe(gulp.dest(dist));
  };
  return task_minifyImage;
};

var minifyCSS = sourceCss => {
  var task_minifyCSS = () => {
    return gulp
      .src(sourceCss, basePath)
      .pipe(cleanCSS({ keepBreaks: true }))
      .pipe(gulp.dest(dist));
  };
  return task_minifyCSS;
};

var minifyJS = sourceJS => {
  var task_minifyJS = () => {
    return gulp
      .src(sourceJS, { base: "babel-temp" })
      .pipe(
        uglify({ mangle: false }).on("error", function(error) {
          console.log(error);
        })
      )
      .pipe(gulp.dest(dist));
  };
  return task_minifyJS;
};

var buildJS = () => {
  var deferred = Q.defer();
  Q.fcall(function() {
    return templateUtil.logStream(
      babelJS(["src/js/*.js", "src/js/*module/*.js"])
    );
  })
    .then(function() {
      return templateUtil.logStream(minifyJS("babel-temp/js/**/*.js"));
    })
    .then(function() {
      return templateUtil.logPromise(clean("babel-temp"));
    });

  return deferred.promise;
};

gulp.task("clean", clean(dist));
gulp.task("copyStaticFile", copyStaticFile());
gulp.task("minifyCSS", minifyCSS("src/css/*.css"));
gulp.task("minifyImage", minifyImage("src/image/*.png"));
gulp.task("buildJS", buildJS);

gulp.task("package", () => {
  var deferred = Q.defer();
  Q.fcall(function() {
    return templateUtil.logPromise(clean(dist));
  })
    .then(function() {
      return Q.all([templateUtil.logStream(copyStaticFile())]);
    })
    .then(function() {
      return Q.all([
        templateUtil.logStream(minifyImage("src/image/*.png")),
        templateUtil.logStream(minifyCSS("src/css/*.css")),
        templateUtil.logStream(buildJS)
      ]);
    });
});
