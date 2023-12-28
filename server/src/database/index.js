const mongoose = require("mongoose");
const { User, UserMethods, Meeting } = require("../model");
const { PasswordEncrypt } = require("../service");

exports.connect = async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  console.log("Connected to MongoDb database ....");
};

const checkDatabase = async () => {
  if ((await User.findOne()) != null) return false;
  if ((await Meeting.findOne()) != null) return false;

  return true;
};

exports.seedData = async () => {
  const isDbEmpty = await checkDatabase();
  if (!isDbEmpty) return;

  const hashedPassword = PasswordEncrypt.hash("12345");
  const user1Email = "user1@gmail.com";
  await User.insertMany([
    {
      email: user1Email,
      password: hashedPassword,
      username: "user1",
    },
    {
      email: "user2@gmail.com",
      password: hashedPassword,
      username: "user2",
    },
  ]);
  const user1Id = await UserMethods.getOne({
    filter: { email: user1Email },
    selection: "_id",
  });

  await Meeting.insertMany([
    {
      meetingId: "111111111",
      password: hashedPassword,
      userId: user1Id,
      topic: "Topic",
      plannedStartTime: Date.now(),
    },
    {
      meetingId: "222222222",
      password: hashedPassword,
      userId: user1Id,
      topic: "Topic2",
      plannedStartTime: Date.now(),
    },
  ]);
};
