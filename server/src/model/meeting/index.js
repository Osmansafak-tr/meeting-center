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
      isAuthenticated: {
        type: Boolean,
        required: true,
      },
      agoraId: {
        type: Number,
        required: true,
      },
      userId: {
        type: mongoose.Types.ObjectId,
        required: false,
      },
    },
  ],
  isStarted: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
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
