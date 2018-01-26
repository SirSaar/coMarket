var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Item');
var upload = require('../upload')

//HERE, ROUTE IS /api/item/*

/* GET ALL ITEMS */
router.get('/', function(req, res, next) {
  Item.find(function (err, items) {
    if (err) return next(err);
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
router.post('/', function(req, res, next) {
  Item.create(req.body, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* UPDATE ITEM */
router.put('/:id', function(req, res, next) {
  Item.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* DELETE ITEM */
router.delete('/:id', function(req, res, next) {
  Item.findByIdAndRemove(req.params.id, req.body, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* UPLOAD ITEM PHOTO */
router.post("/photo-upload/:id",upload,function(req, res, next) {
  console.log("this file uploaded: ", req.files[0]);
  res.json(req.files[0]);
});

module.exports = router;
