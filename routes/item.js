var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Item');
var Item = require('../models/User');
var upload = require('../upload')
var isLoggedIn= require('./isLoggedInFunc');

//HERE, ROUTE IS /api/item/*

/* GET ALL ITEMS */
router.get('/', function(req, res, next) {
  Item.find(function (err, items) {
    if (err) return next(err);
    res.json(items);
  });
});

/* GET ALL ITEMS OF USER */
router.get('/personal',isLoggedIn, function(req, res, next) { //check
  User.findById(req.user._id, function(err, user) {
    if (err) return next(err);
    let items = [];
    user.items.forEach(function(item) {
      Item.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        items.append(item);
      });
    });
    res.json(items);
  });

});

/* GET SINGLE ITEM BY ID */
router.get('/:id', function(req, res, next) {
  Item.findById(req.params.id, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* SAVE ITEM */
router.post('/',isLoggedIn, function(req, res, next) {
  req.body.user = req.user._id;
  Item.create(req.body, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* UPDATE ITEM */
router.put('/:id',isLoggedIn, function(req, res, next) {
  req.body.user = req.user._id;
  Item.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* DELETE ITEM */
router.delete('/:id',isLoggedIn, function(req, res, next) {
  req.body.user = req.user._id;
  Item.findByIdAndRemove(req.params.id, req.body, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* UPLOAD ITEM PHOTO */
router.post('/upload-photo',isLoggedIn,upload,function(req, res, next) {
  console.log("this file uploaded: ", req.files[0]);
  res.json(req.files[0]);
});

module.exports = router;
