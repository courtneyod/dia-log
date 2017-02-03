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
console.log(AWS.config, 'config')

var upload = multer({
    storage: multerS3({
        limits : { fileSize:3000000 },
        s3: s3,
        bucket: 'dialog-courtney',
        key: function (req, file, cb) {
            console.log(file);
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
    console.log(req.body, 'request')
    console.log(req.file, 'files')

    if (!req.files || !req.files.file1) {
        return res.status(403).send('expect 1 file upload named file1').end();
    }
    var file1 = req.files.file1;

    // this is mainly for user friendliness. this field can be freely tampered by attacker.
    if (!/^image\/(jpe?g|png|gif)$/i.test(file1.mimetype)) {
        return res.status(403).send('expect image file').end();
    }

    var pid = '10000' + parseInt(Math.random() * 10000000);

    uploadToS3(file1, pid, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('failed to upload to s3').end();
        }
        res.status(200)
            .send('File uploaded to S3: '
                    + data.Location.replace(/</g, '&lt;')
                    + '<br/><img src="' + data.Location.replace(/"/g, '&quot;') + '"/>')
            .end();
    })
})











// AWS.config.update({
//         accessKeyId: accessKeyId,
//         secretAccessKey: secretAccessKey,
//         region: 'us-east-1'
//     });

// var s3 = new AWS.S3();
//
// s3.config.update({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey
// });
//


// //use by upload form
// router.post('/', upload.array('upl'), function (req, res, next) {
//     console.log(req, "this is the post")
//     console.log('uploaded')
// });

module.exports = router
