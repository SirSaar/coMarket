var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
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
  
  
// =====================================
// LOGOUT ==============================
// =====================================
/*
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
};
*/
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    //res.redirect('/');  //todo:error
    res.json();
}


module.exports = router;