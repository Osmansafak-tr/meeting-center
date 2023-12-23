const { UserMethods } = require("../../model");
const { RequestHandler, PasswordEncrypt } = require("../../service");
const { AppError } = require("../../common/class");
const { INVALID_EMAIL, INVALID_USERNAME } =
  require("../../common/constant").ErrorConstants;
const requestHandler = RequestHandler.tokenService;

const checkSameData = async (
  filter,
  error = { constant: INVALID_EMAIL, message: "" }
) => {
  const errorFunction = (user) => {
    if (user != null) throw new AppError(error.constant, 400, error.message);
  };
  await UserMethods.getOne({
    filter: filter,
    errorFunction: errorFunction,
  });
};

exports.Register = async (userModel) => {
  const { username, email, password, name, surname } = userModel;
  // Check if this email is available
  let error = {
    constant: INVALID_EMAIL,
    message: "There is already an account created with this email.",
  };
  await checkSameData({ email: email }, error);

  // Check if this username is available
  error = {
    constant: INVALID_USERNAME,
    message:
      "This username already taken by another user. Please select a different username.",
  };
  await checkSameData({ username: username }, error);

  const hashedPassword = PasswordEncrypt.hash(password);
  const user = {
    username: username,
    email: email,
    password: hashedPassword,
    name: name,
    surname: surname,
  };
  await UserMethods.createOne(user);
};

exports.Login = async (email, password) => {
  // Verify user authentication
  const userId = await UserMethods.verifyAuth(email, password);

  // Get tokens from token service
  const body = { userId: userId };
  const response = await requestHandler.post("/connect/token", body);
  const { accessToken, refreshToken } = response.data;

  // Update users refreshToken value and return accessToken
  await UserMethods.updateOne({ _id: userId }, { refreshToken: refreshToken });
  return { accessToken: accessToken };
};

exports.Logout = async (userId, refreshToken) => {
  // update users refresh token
  const filter = { _id: userId };
  const model = { refreshToken: "" };
  await UserMethods.updateOne(filter, model);

  // delete refreshToken from database
  const url = "/token/" + refreshToken;
  await requestHandler.delete(url);
};
