"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require('../knex');

var passport = require('passport');
var fs = require('fs');
var AWS = require('aws-sdk');
var accessKeyId =  process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });

var s3 = new AWS.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dialog-courtney',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

router.post('/', function(req, res, next){

})


module.exports = router
