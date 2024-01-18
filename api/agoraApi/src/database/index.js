const mongoose = require("mongoose");

exports.connect = async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  console.log("Connected to MongoDB service ...");
};
