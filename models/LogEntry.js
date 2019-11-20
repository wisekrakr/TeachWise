const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Log Entry Schema
const LogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  },
  topic: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = LogEntry = mongoose.model("log", LogSchema);
