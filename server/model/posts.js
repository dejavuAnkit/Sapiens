const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const schema = new Schema({ postid: String });

const postSchema = new Schema({
  email: {
    type: String,
    required: false
  },
  postid: {
      type: String,
      required: true
  },
  bedroom: {
      type: String
  },
  area: {
      type: String
  },
  price: {
      type: String
  },
  description: {
      type: String
  },
  isSold: {
      type: Boolean,
      default: false
  },
  purchasedBy:{
      type: String
  },
  images:[{
      type: String
  }]
})

postSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Posts", postSchema);