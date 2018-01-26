var multer = require('multer');


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null,"./public/images/items/")
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  });
  
  var upload = multer({ storage:Storage }).array("itemPhoto", 1);  //name of field and number of uploads

  module.exports = upload;