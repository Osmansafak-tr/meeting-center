const User = require("./index");
const defaultSelection = "-__v";

exports.getAll = async (selection = defaultSelection) => {
  const users = await User.find().select(selection);
  return users;
};

exports.getOne = async (filter, selection = defaultSelection) => {
  const user = await User.findOne(filter).select(selection);
  return user;
};
