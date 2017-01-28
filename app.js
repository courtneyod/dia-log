const Express = require('express')
const app = Express()
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
var db  = require('./knex');

var auth = require('./routes/auth');
var settings = require('./routes/settings');
var photoUpload = require('./routes/photo-upload');
var photoFeed = require('./routes/photo-feed');


app.use('/auth', auth)
app.use('/settings', settings)
app.use('/upload', photoUpload)
app.use('/feed', photoFeed)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('No route matches the page');
  err.status = 404;
  next(err);
});

// const PORT = process.env.PORT || 3000
// app.listen(PORT, ()=> {
// 	console.log(`Listening on port ${PORT}`)
// })


module.exports = app;
