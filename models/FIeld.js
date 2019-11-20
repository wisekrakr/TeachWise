const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Field = mongoose.model(
  "field",
  new Schema({
    name: {
      type: String,
      required: true
    },
    sub_topic: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);
