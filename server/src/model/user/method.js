const User = require("./index");
const { checkValidValue } = require("../function");
const { AppError } = require("../../common/class");
const { DATA_NOT_FOUND, INVALID_EMAIL, INVALID_PASSWORD } =
  require("../../common/constant").ErrorConstants;
const { PasswordEncrypt } = require("../../common/service");
const defaultSelection = "-__v";

exports.getAll = async (selection = defaultSelection) => {
  const users = await User.find().select(selection);
  return users;
};

exports.getOne = async ({
  filter,
  selection = defaultSelection,
  appError = new AppError(DATA_NOT_FOUND, 404, "User not found."),
}) => {
  const user = await User.findOne(filter).select(selection);
  if (user == null) throw appError;
  return user;
};

exports.updateOne = async (filter, model) => {
  const user = await this.getOne({ filter: filter });
  user.name = checkValidValue(user.name, model.name);
  user.surname = checkValidValue(user.surname, model.surname);
  user.refreshToken = checkValidValue(user.refreshToken, model.refreshToken);
  user.updatedAt = Date.now();
  await user.save();
};

exports.verifyAuth = async (email, password) => {
  const filter = { email: email };

  const appError = new AppError(INVALID_EMAIL, 401, "Invalid email");
  const user = await this.getOne({ filter: filter, appError: appError });

  const result = await PasswordEncrypt.verify(password, user.password);
  if (!result) throw new AppError(INVALID_PASSWORD, 401, "Invalid password");

  return user._id;
};
