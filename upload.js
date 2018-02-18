var multer = require('multer');


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null,"./public/images/items/")
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  });
  
  var upload = function(req,res,next) {
    multer({ 
      storage:Storage
    })
    .single("itemPhoto"); 
    console.log("this file uploaded: ", req.files[0]);
    res.json(req.files[0]);
 } //name of field and number of uploads

  module.exports = upload;