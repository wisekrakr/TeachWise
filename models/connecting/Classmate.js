const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Log Entry Schema
const ClassmateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile"
  },
  name: {
    type: String,
    required: true
  },
  friend_tier: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Classmate = mongoose.model("classmate", ClassmateSchema);
