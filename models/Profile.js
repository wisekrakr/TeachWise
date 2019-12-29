const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  avatar: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  // skills: [
  //   {
  //     skill: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "skills"
  //     }
  //   }
  // ],
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      field_of_study: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
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

module.exports = Profile = mongoose.model("profile", ProfileSchema);
