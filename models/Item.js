var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  title: String,
  trader: String,
  description: String,
  condition: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', ItemSchema);
