var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Item');
var User = require('../models/User');
var upload = require('../upload')
var isLoggedIn= require('./isLoggedInFunc');

//HERE, ROUTE IS /api/item/*

/* GET ALL ITEMS */
router.get('/', function(req, res, next) {    //check the returns
  Item.find(function (err, items) {
    if (err) { return console.log(err); next(err); }
    var detailedItems = [];
    console.log('Get items api,begin with:',detailedItems,',items :',items);
    items.forEach(function(item) {
      console.log('Get items api:iterator:',detailedItems, "current item is:",item);
      if(!item.enabled) return;
      console.log("id of item's user",item.user);
      User.findById(item.user, function(err, user) {
        console.log("user of item is:", user);
        if(err) { return console.log(err); next(err); }
        detailedItem= JSON.parse(JSON.stringify(item));
        //console.log("#1 title:",detailedItem.title);
        detailedItem.userProfile= {};
        detailedItem.userProfile.location= user.location;
        detailedItem.userProfile.name= user.facebook.name;
        console.log("push detailed item:",detailedItem);
        detailedItems.push(detailedItem);
        console.log("detailedItems",detailedItems);

      });
    });
    console.log('finished items:',detailedItems);
    res.json(detailedItems);
  });
});

/* GET ALL ITEMS OF LOGGED USER */
router.get('/personal',isLoggedIn, function(req, res, next) { //check
    let personalItems = [];
    req.user.items.forEach(function(itemID) {
      Item.findById(itemID, function (err, item) {
        if (err) return next(err);
        personalItems.push(item);
      });
    }); //end loop
    res.json(personalItems);
});

/* GET SINGLE ITEM BY ID */
router.get('/:id', function(req, res, next) {
  Item.findById(req.params.id, function (err, item) {
    if (err) return next(err);
    User.findById(item.user, function(err, user) {
      if(err) return next(err);
      item.userProfile={};
      item.userProfile.location= user.location;
      item.userProfile.name= user.name;
    });
    res.json(item);
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
      user.items.push(item._id);
      user.save();
      res.json(item);
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
  req.body.user = req.user._id;
  Item.findByIdAndRemove(req.params.id, req.body, function (err, item) {
    if (err) return next(err);
    User.findById(item.user,function(err, user) {
    if(err) return next(err);
    user.items.filter(user.items !== item._id);
    user.save();
    res.json(item);
  });
    
  });
});

/* UPLOAD ITEM PHOTO */
router.post('/upload-photo',isLoggedIn,upload,function(req, res, next) {
  console.log("this file uploaded: ", req.files[0]);
  res.json(req.files[0]);
});

module.exports = router;
