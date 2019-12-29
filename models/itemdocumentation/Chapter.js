const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Log Entry Schema
const ChapterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "items"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chapter = mongoose.model("chapter", ChapterSchema);
