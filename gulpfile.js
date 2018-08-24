const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const gcPub = require('gulp-gcloud-publish')
const templateUtil = require('gulp-template-util')
const Storage = require('@google-cloud/storage')
const del = require('del')
const Q = require('q')

const basePath = {base: './src'}
const dist = './dist'

const clean = sourceDir => {
  return () => {
    return del([sourceDir])
  }
}

const copyStaticFile = () => {
  return () => {
    return gulp
      .src(['./src/**/*.html', './src/js/lib/*.js', './src/audio/*'], basePath)
      .pipe(gulp.dest(dist))
  }
}

const babelJS = sourceJS => {
  return () => {
    return gulp
      .src(sourceJS, basePath)
      .pipe(babel())
      .pipe(gulp.dest('./babel-temp'))
  }
}

const minifyImage = sourceImage => {
  return () => {
    return gulp
      .src(sourceImage, basePath)
      .pipe(imagemin({use: [pngquant()]}))
      .pipe(gulp.dest(dist))
  }
}

const minifyCSS = sourceCss => {
  return () => {
    return gulp
      .src(sourceCss, basePath)
      .pipe(cleanCSS({keepBreaks: true}))
      .pipe(gulp.dest(dist))
  }
}

const minifyJS = sourceJS => {
  return task_minifyJS = () => {
    return gulp
      .src(sourceJS, {base: './babel-temp'})
      .pipe(
        uglify({mangle: false}).on('error', function (error) {
          console.log(error)
        })
      )
      .pipe(gulp.dest(dist))
  }
}

const buildJS = () => {
  Q.fcall(templateUtil.logStream.bind(templateUtil.logStream, babelJS(['./src/js/*.js', './src/js/*module/*.js'])))
    .then(templateUtil.logStream.bind(templateUtil.logStream, minifyJS('./babel-temp/js/**/*.js')))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise, clean('./babel-temp')))

  return Q.defer().promise
}

const deleteGcsObject = (bucketName) => {
  const storage = new Storage()
  storage
    .bucket(bucketName)
    .file('richman-questionnaire/**')
    .delete()
    .then(() => {
      console.log(`gs://${bucketName}/${filename} deleted.`)
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}

const uploadGcs = bucketName => {
  return gulp
    .src([
      './dist/*.html',
      './dist/css/*.css',
      './dist/js/**/*.js',
      // './dist/lib/**/*.@(js|json)',
      './dist/image/**/*.@(jpg|png|gif|svg)',
      './dist/audio/*.@(mp3|wav)'
    ], {
      base: `${__dirname}/dist/`
    })
    .pipe(gcPub({
      bucket: bucketName,
      keyFilename: 'tutor.json',
      base: 'event/richman-questionnaire/',
      projectId: 'tutor-204108',
      public: true,
      metadata: {
        cacheControl: 'private, no-transform'
      }
    }))
}

gulp.task('clean', clean(dist))
gulp.task('copyStaticFile', copyStaticFile())
gulp.task('minifyCSS', minifyCSS('./src/css/*.css'))
gulp.task('minifyImage', minifyImage('./src/image/*.png'))
gulp.task('buildJS', buildJS)
gulp.task('uploadGcs', uploadGcs.bind(uploadGcs, 'tutor-events'))
gulp.task('package', () => {
  Q.fcall(templateUtil.logPromise.bind(templateUtil.logPromise, clean(dist)))
    .then(templateUtil.logStream.bind(templateUtil.logStream, copyStaticFile()))
    .then(templateUtil.logStream.bind(templateUtil.logStream, minifyImage('./src/image/*.png')))
    .then(templateUtil.logStream.bind(templateUtil.logStream, minifyCSS('./src/css/*.css')))
    .then(templateUtil.logStream.bind(templateUtil.logStream, buildJS))

  return Q.defer().promise
})
