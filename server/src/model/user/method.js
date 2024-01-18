const User = require("./index");
const { updateObject } = require("../function");
const { AppError } = require("../../common/class");
const { DATA_NOT_FOUND, INVALID_EMAIL, INVALID_PASSWORD } =
  require("../../common/constant").ErrorConstants;
const { PasswordEncrypt } = require("../../service");
const defaultSelection = "-__v";

exports.getAll = async (selection = defaultSelection) => {
  const users = await User.find().select(selection);
  return users;
};

exports.getOne = async ({
  filter,
  selection = defaultSelection,
  errorFunction = (user) => {
    if (user == null)
      throw new AppError(DATA_NOT_FOUND, 404, "User not found.");
  },
}) => {
  const user = await User.findOne(filter).select(selection);
  errorFunction(user);
  return user;
};

exports.createOne = async (model) => {
  await User.create(model);
};

exports.updateOne = async (filter, model) => {
  let user = await this.getOne({ filter: filter });
  updateObject(user, model);
  await user.save();
};

exports.verifyAuth = async (email, password) => {
  const filter = { email: email };

  const errorFunction = (user) => {
    if (user == null) throw new AppError(INVALID_EMAIL, 401, "Invalid email");
  };
  const user = await this.getOne({
    filter: filter,
    errorFunction: errorFunction,
  });

  const result = await PasswordEncrypt.verify(password, user.password);
  if (!result) throw new AppError(INVALID_PASSWORD, 401, "Invalid password");

  return user._id;
};
