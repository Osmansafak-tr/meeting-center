const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
  meetingId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  plannedStartTime: {
    type: Date,
    required: true,
  },

  participants: [
    {
      name: {
        type: String,
        required: true,
      },
      agoraId: {
        type: Number,
        required: true,
      },
    },
  ],
  isStarted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  startTime: {
    type: Date,
    default: new Date(0),
  },
  endTime: {
    type: Date,
    default: new Date(0),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Meeting = mongoose.model("meeting", meetingSchema);
module.exports = Meeting;
