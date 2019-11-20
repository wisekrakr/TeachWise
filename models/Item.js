const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Item Schema
module.exports = Item = mongoose.model(
  "item",
  new Schema({
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
    // field_of_study: {
    //   type: Schema.Types.ObjectId,
    //   ref: "fields"
    // },

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
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
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
  })
);
