const mongoose = require("mongoose");

// Create Log Entry Schema
const LogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = LogEntry = mongoose.model("log", LogSchema);
