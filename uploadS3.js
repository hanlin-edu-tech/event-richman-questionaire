const AWS = require("aws-sdk");
const FS = require("fs");
const PATH = require("path");
const EHANLIN_S3_ID = process.env.EHANLIN_S3_ID;
const EHANLIN_S3_KEY = process.env.EHANLIN_S3_KEY;

AWS.config.update({
  accessKeyId: EHANLIN_S3_ID,
  secretAccessKey: EHANLIN_S3_KEY
});

const AWS_S3 = new AWS.S3();
const SOURCE_DIR = `${__dirname}/src`;

/**
 * 執行 uploadS3 所帶參數
 * EX: nodejs uploadS3 bucket destinationDir
 *     arg0      1        2        3
 */
const BUCKET = process.argv[2]; // 指定 S3 上傳的 bucket
const DESTINATION_DIR = process.argv[3]; // 指定 bucket 下的目標資料夾

console.log(`*** initial to upload in ${SOURCE_DIR}/src`);
if (!DESTINATION_DIR || !BUCKET) {
  console.log("not found parameters");
  return;
}

/**
 * 判斷檔案是否為空
 */
var determineFileEmpty = files => {
  if (!files || files.length === 0) {
    console.log(`${files} is not found or empty...`);
    return true;
  }

  return false;
};

/**
 * 循環掃描來源資料夾下的檔案並執行 AWS S3 上傳
 */
var scanDir = sourceDir => {
  var upload = (fileName, remoteS3Path, entireFilePath) => {
    var key = remoteS3Path;
    var params = {
      Bucket: BUCKET,
      Body: FS.readFileSync(entireFilePath),
      Key: key,
      ACL: "public-read"
    };

    var extName = PATH.extname(fileName);
    if (extName === ".js") {
      params.ContentType = "application/x-javascript";
    } else if (extName === ".css") {
      params.ContentType = "text/css";
    } else if (extName === ".html") {
      params.ContentType = "text/html";
    }

    AWS_S3.putObject(params)
      .on("httpUploadProgress", function(progress) {
        // 上傳的進程
        console.log(
          `upload to ${key}, ${progress.loaded} of ${progress.total} bytes`
        );
      })
      .send((err, data) => {
        if (err) console.log("err is " + err);
      });
  };

  FS.readdir(sourceDir, (err, files) => {
    if (determineFileEmpty(files)) return;

    files.forEach(fileName => {
      if (excludeFile.test(fileName)) return;

      entireFilePath = PATH.join(sourceDir, fileName);
      if (FS.statSync(entireFilePath).isDirectory()) {
        scanDir(entireFilePath);
        return;
      }

      var remoteS3Path = entireFilePath.replace(SOURCE_DIR, DESTINATION_DIR);
      upload(fileName, remoteS3Path, entireFilePath);
    });
  });
};

var excludeFile = /.DS_Store/;
scanDir(SOURCE_DIR);
