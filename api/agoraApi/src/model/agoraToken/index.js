const mongoose = require("mongoose");
const { Schema } = mongoose;

const agoraTokenSchema = Schema({
  tokenContent: {
    type: String,
    required: true,
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

module.exports = mongoose.model("agoraToken", agoraTokenSchema);
