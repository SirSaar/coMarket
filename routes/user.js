var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var isLoggedIn= require('./isLoggedInFunc');
var User     = require('../models/User');
// this is "/user" route
// var Item = require('../models/Item.js');
/*
app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.json({ message : req.flash('loginMessage') }); 
});
*/
// process the login form
// app.post('/login', do all our passport stuff here);

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
/*
app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});
*/
// process the signup form
// app.post('/signup', do all our passport stuff here);

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
    res.json( req.user // get the user out of session and pass to template
    );
});


// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
}));

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
  
router.get('/:id', function(req, res, next) {       //todo: return only public values //api: return user by id
    User.findById(req.params.id, function(err, user) {
        if(err) return next(err);
        res.json(user);
    });
});


module.exports = router;