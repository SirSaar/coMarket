var express = require('express');
var router = express.Router();

var item = require('./routes/item.js');

router.use('item',item);

module.exports = router;
