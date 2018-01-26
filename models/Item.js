var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  title: String,
  user: String,     //id of trader only
  qrCode: String,
  image: String,      //url from the API
  enabled: { type: Boolean, default: true },  //If true,item can be traded. if false,not. book is beign reading
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
