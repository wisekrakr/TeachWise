const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Log Entry Schema
const FollowerSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Follower = mongoose.model("follower", FollowerSchema);
