const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  isRegistered: {
    type: Boolean,
  },
  userType:{
    type: String,
    required: false
  }
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);