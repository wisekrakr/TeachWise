const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Field = mongoose.model(
  "field",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      required: true
    },
    number: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);
