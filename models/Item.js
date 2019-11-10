const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Item Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  field_of_study: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    default: "No additional information specified"
  },
  material: {
    type: String,
    default: "No study material specified"
  },
  difficulty: {
    type: String,
    default: "Beginner"
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Not Started"
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
