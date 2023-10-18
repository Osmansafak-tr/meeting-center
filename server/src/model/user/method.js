const User = require("./index");
const { checkValidValue } = require("../function");
const defaultSelection = "-__v";

exports.getAll = async (selection = defaultSelection) => {
  const users = await User.find().select(selection);
  return users;
};

exports.getOne = async (filter, selection = defaultSelection) => {
  const user = await User.findOne(filter).select(selection);
  if (user == null) throw new Error("User can not found.");
  return user;
};

exports.updateOne = async (filter, model) => {
  const user = await this.getOne(filter);
  user.name = checkValidValue(user.name, model.name);
  user.surname = checkValidValue(user.surname, model.surname);
  user.refreshToken = checkValidValue(user.refreshToken, model.refreshToken);
  user.updatedAt = Date.now();
  await user.save();
};
