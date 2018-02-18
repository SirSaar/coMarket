var mongoose = require('mongoose');
var User = require('./User');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  _id              : { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId() },
  title: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },     //id of trader only
  qrCode: String,
  price:  { type: Number, default: 10 },
  image: String,      //url from the API
  enabled: { type: Boolean, default: true },  //If true,item can be traded. if false,not. book is beign reading
  updated_date: { type: Date, default: Date.now }
}, {
  usePushEach: true
});

module.exports = mongoose.model('Item', ItemSchema);
