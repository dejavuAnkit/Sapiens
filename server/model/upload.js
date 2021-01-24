const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  path: {
      type: String
  },
  postid: {
    type: String
  }
})

uploadSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Upload", uploadSchema);