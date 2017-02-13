require('dotenv').config({silent: true});
const Express = require('express')
const app = Express()
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const db  = require('./knex');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const morgan = require('morgan'); // For logging
const cors = require('cors')

app.use(cors())

var aws = require('./routes/auth');
var settings = require('./routes/settings');
var photos = require('./routes/photos');
var login = require('./routes/login');
var signup = require('./routes/signup');
var categories = require('./routes/categories');
var health_stat_categories = require('./routes/health_stat_categories');

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))
//
// const myGoogleConfigs = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
//   }
//
// passport.use(new GoogleStrategy(myGoogleConfigs, function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
// ## CORS middleware
// For more info see: https://gist.github.com/cuppster/2344435
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use('/aws', aws)
app.use('/settings', settings)
app.use('/photos', photos)
app.use('/login', login)
app.use('/signup', signup)
app.use('/categories', categories)
app.use('/health-stat-categories', health_stat_categories)

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(req, 'No route matches the page');
  err.status = 404;
  next(err);
});

// const PORT = process.env.PORT || 3000
// app.listen(PORT, ()=> {
// 	console.log(`Listening on port ${PORT}`)
// })


module.exports = app;
