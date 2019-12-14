const mongoose = require("mongoose");

// Create User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  metadata: {
    item_count: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "items"
        }
      }
    ],
    field_count: [
      {
        field_of_study: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "fields"
        }
      }
    ],
    log_count: [
      {
        log: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "logs"
        }
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
