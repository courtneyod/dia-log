"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require('../knex');
var bodyParser = require('body-parser');
var multer = require('multer');
var multerS3 = require('multer-s3');
var morgan = require('morgan'); // For logging
var uuid = require('uuid');
var passport = require('passport');
var fs = require('fs');
// var upload = multer({destination: '/downloads'})

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname+'/../aws-config.json');
var s3 = new AWS.S3();

AWS.config.update({region:'us-east-1'});
// AWS.config.update({"credentials": {
//     "accessKeyId": process.env.AWS_ACCESS_KEY,
//       "secretAccessKey": process.env.AWS_SECRET_KE ,
//   }});

// http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Disk
// console.log(AWS.config, 'config')

var upload = multer({
    storage: multerS3({
        limits : { fileSize:3000000 },
        s3: s3,
        bucket: 'dialog-courtney',
        key: function (req, file, cb) {
            // console.log(file, 'file in multer');
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

// assume you already have the S3 Bucket created, and it is called ierg4210-shopxx-photos
var photoBucket = new AWS.S3({params: {Bucket: 'dialog-courtney'}});

function uploadToS3(file, destFileName, callback) {
    photoBucket
        .upload({
            ACL: 'public-read',
            Body: fs.createReadStream(file.path),
            Key: destFileName.toString(),
            ContentType: 'application/octet-stream' // force download if it's accessed as a top location
        })
        // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#httpUploadProgress-event
        // .on('httpUploadProgress', function(evt) { console.log(evt); })
        // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#send-property
        .send(callback);
}

router.post('/', upload.single('file'), function (req, res) {
    console.log(req.file, 'files')
    console.log(req.file.location, 'file location for aws')

    if (!req.file) {
        return res.status(403).send('expect 1 file upload named file1').end();
    }
    var file1 = req.file;
    // this is mainly for user friendliness. this field can be freely tampered by attacker.
    if (!/^image\/(jpe?g|png|gif)$/i.test(file1.mimetype)) {
        return res.status(403).send('expect image file').end();
    }

    var pid = '10000' + parseInt(Math.random() * 10000000);

    // var jsonObj = 'File uploaded to S3: '
    //         + file1.location.replace(/</g, '&lt;')
    //         + '<br/><img src="' + file1.location.replace(/"/g, '&quot;') + '"/>'

    var jsonObj = file1

    res.json({jsonObj})

  //   { fieldname: 'file',
  // originalname: 'GOPR0441.JPG',
  // encoding: '7bit',
  // mimetype: 'image/jpeg',
  // size: 4836562,
  // bucket: 'dialog-courtney',
  // key: 'GOPR0441.JPG',
  // acl: 'private',
  // contentType: 'application/octet-stream',
  // contentDisposition: null,
  // storageClass: 'STANDARD',
  // metadata: null,
  // location: 'https://dialog-courtney.s3.amazonaws.com/GOPR0441.JPG',
  // etag: '"3eac51ee5f6f155b86e6cec2a4b3ac65"' }

    // uploadToS3(file1, pid, function (err, data) {
    //     console.log('data', data)
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('failed to upload to s3').end();
    //     }
    //     res.status(200)
    //         .send('File uploaded to S3: '
    //                 + data.Location.replace(/</g, '&lt;')
    //                 + '<br/><img src="' + data.Location.replace(/"/g, '&quot;') + '"/>')
    //         .end();
    // })
})

// router.get('/',function(req,res){
//     console.log(req.body, 'body from get request for aws')
//     var url = req.body
//
//     var imgStream = s3.getObject({
//       Bucket: 'dialog-courtney',
//       Key: url
//     }).createReadStream();
//     // http://s3-us-west-2.amazonaws.com/my-bucket/myobject.jpg
//     imgStream.pipe(res);
// });

router.get('/', (req, res) => {
  // const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: 'dialog-courtney',
    Key: fileName,
    Expires: 60,
    Region:'us-east-1',
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    console.log(data, 'data returned')
    const returnData = {
      signedRequest: data,
      url: `https://dialog-courtney.s3-us-east-1.amazonaws.com/${fileName}`
    };
    console.log('returned data before json ,', returnData)
    res.write(JSON.stringify(returnData));
    res.end();
  });
});



module.exports = router
