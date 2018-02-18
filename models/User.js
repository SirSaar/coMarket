// load the things we need
var mongoose = require('mongoose');
var Item = require('./Item');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
// define the schema for our user model
var userSchema = Schema({
    _id              : { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId() },
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    name             : {  type: String },
    credit           : { type: Number, default: 10 },
    items            : [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    location         : { type: String, default: '' },
    phone            : String,
    updated_date: { type: Date, default: Date.now }

}, {
    usePushEach: true
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);