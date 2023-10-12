const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = Schema({
  tokenContent: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);
module.exports = RefreshToken;
