const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Log Entry Schema
const ClassroomSchema = new Schema({
  leader: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Classroom = mongoose.model("classroom", ClassroomSchema);
