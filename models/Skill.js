const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Skill = mongoose.model(
  "skill",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);
