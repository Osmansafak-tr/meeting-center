const mongoose = require("mongoose");
const { User } = require("../model");
const { PasswordEncrypt } = require("../service");

exports.connect = async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  console.log("Connected to MongoDb database ....");
};

const checkDatabase = async () => {
  if ((await User.findOne()) != null) return false;

  return true;
};

exports.seedData = async () => {
  const isDbEmpty = await checkDatabase();
  if (!isDbEmpty) return;

  const hashedPassword = await PasswordEncrypt.hash("12345");
  User.insertMany([
    {
      email: "user1@gmail.com",
      password: hashedPassword,
      username: "user1",
    },
    {
      email: "user2@gmail.com",
      password: hashedPassword,
      username: "user2",
    },
  ]);
};
