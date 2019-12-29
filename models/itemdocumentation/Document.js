const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Log Entry Schema
const DocumentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  chapter: {
    type: Schema.Types.ObjectId,
    ref: "chapters"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Document = mongoose.model("document", DocumentSchema);
