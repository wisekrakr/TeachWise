const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Item Schema
const ItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  field_of_study: {
    type: String,
    required: true
  },
  user_comments: [
    {
      title: {
        type: String,
        required: true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      comment: {
        type: String,
        required: true
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
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
