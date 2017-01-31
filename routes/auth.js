"use strict"

const Express = require('express')
const router = Express.Router()
var knex = require('../knex');

var passport = require('passport');

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
// router.get('/google', passport.authenticate(GoogleStrategy, { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));

module.exports = router
