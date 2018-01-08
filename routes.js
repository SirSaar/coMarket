var express = require('express');
var router = express.Router();
var passport = require('passport');

var item = require('./routes/item.js');
var user = require('./routes/user.js');

router.use('/item',item);
router.use('/user',user)

module.exports = router;
