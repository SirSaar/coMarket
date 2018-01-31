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
  var detailedItems = [];
  Item.find().lean().exec(function (err, items) {
    if (err) { return console.log(err); next(err); }
    console.log('Get items api,begin with:',detailedItems,',items :',items);
    items.forEach(function(item,index) {
      console.log('Get items api:iterator:',detailedItems, "current item is:",item);
      if(!item.enabled) return;
      User.findById(item.user, function(err, user) {
        console.log("user of item is:", user);
        if(err) { return console.log(err); next(err); }
        detailedItem= item;
        //console.log("#1 title:",detailedItem.title);
        detailedItem.userProfile= {};
        detailedItem.userProfile.location= user.location;
        detailedItem.userProfile.name= user.facebook.name;
        console.log("current detailed item:",detailedItem);
        detailedItems.push(detailedItem);
        
        if(index === items.length-1) {
          res.json(detailedItems);
          console.log('final detailed items:',detailedItems);
        }
      });
    });
  });
});

/* GET ALL ITEMS OF LOGGED USER */
router.get('/personal',isLoggedIn, function(req, res, next) { //check
    var personalItems = [];
    req.user.items.forEach(function(itemID, index) {
      Item.findById(itemID, function (err, item) {
        if (err) return next(err);
        personalItems.push(item);
        if(index === req.user.items.length-1) {
          res.json(personalItems);
          console.log('final personal items:',personalItems);
        }
      });
    }); //end loop
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
      res.json(item);
    });
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
  Item.findByIdAndRemove(req.params.id).lean().exec(function (err, item) {
    if (err) return next(err);
    User.findById(item.user).lean().exec(function(err, user) {
      if(err) return next(err);
      console.log("typeof user items:",typeof(user.items));
      //var updatedUser = user.toObject();   //mongoose query returns "Mongoose Document object"
      console.log("user.items:",user.items,",item._id",item._id);
      const userItems= { items : user.items.filter(function(itemID) { return (itemID != item._id) }) };   //delete item from array of items id
      console.log("The updated user items is:",userItems);
      User.findByIdAndUpdate(user._id,userItems, function(err, user) {
        if(err) return next(err);
        res.json(item);
      });
    });
    
  });
});

/* UPLOAD ITEM PHOTO */
router.post('/upload-photo',isLoggedIn,upload,function(req, res, next) {
  console.log("this file uploaded: ", req.files[0]);
  res.json(req.files[0]);
});

module.exports = router;
