require('dotenv').config({silent: true});
const Express = require('express')
const app = Express()
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const db  = require('./knex');
const passport = require('passport');
const session = require('express-session');

var auth = require('./routes/auth');
var settings = require('./routes/settings');
var photos = require('./routes/photos');
var login = require('./routes/login');
var categories = require('./routes/categories');

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth)
app.use('/settings', settings)
app.use('/photos', photos)
app.use('/login', login)
app.use('/categories', categories)

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
