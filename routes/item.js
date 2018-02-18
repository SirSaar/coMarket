var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Item');
var User = require('../models/User');
var upload = require('../upload')
var isLoggedIn= require('./isLoggedInFunc');

//HERE, ROUTE IS /api/item/*

/* GET ALL ITEMS */
//todo: try add streams
//todo: change model arch to nested models and then fetch data 
//BE AWARE that mongoose querying are async-only the callback func is sync
router.get('/', function(req, res, next) {    //check the returns
  Item.find({enabled:true}).
  populate({path:'user', select:['location','name']}).
  exec(function (err, items) {
    if (err) return next(err); 
    console.log("#1",items);
    return res.json(items);
  });
});

/* GET ALL ITEMS OF LOGGED USER */
router.get('/personal',isLoggedIn, function(req, res, next) { //check
  Item.find({
    '_id': { $in: req.user.items}
  }).
  exec(function(err, items) {
    if(err) return next(err);
    return res.json(items);
  });
});

/* SAVE ITEM */
router.post('/',isLoggedIn, function(req, res, next) {
  req.body.user = req.user._id;
  Item.create(req.body, function (err, item) {
    if (err) return next(err);
    //update user- to add item to it

    User.findById(item.user,function(err, user) {
      if(err) return next(err);
      console.log("#1 items is:",user.items);
      user.items.push(item);
      console.log("#1 items is:",user.items);
      user.save();
      res.json(user);
    });
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
  Item.findByIdAndRemove(req.params.id).populate('user').exec(function (err, item) {
    if (err) return next(err);
    console.log("#1 items is:",item.user.items);
    item.user.items.filter(function(itemID) { return (itemID != item._id) });
    console.log("#1 items is:",item.user.items);
    item.user.save();
    res.json(item);
  });
});

/* UPLOAD ITEM PHOTO */
router.post('/upload-photo',isLoggedIn,
upload);

module.exports = router;
