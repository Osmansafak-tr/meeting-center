const { UserMethods } = require("../../model");
const { PasswordEncrypt, RequestHandler } = require("../../common/service");
const requestHandler = RequestHandler.tokenService;

exports.Login = async (formUser) => {
  // Validate login form
  const filter = { email: formUser.email };
  const user = await UserMethods.getOne(filter);
  if (user == null) throw new Error("Invalid email");
  const result = await PasswordEncrypt.verify(formUser.password, user.password);
  if (!result) throw new Error("Invalid password");

  // Get tokens from token service
  const body = { userId: user._id };
  const response = await requestHandler.post("/connect/token", body);
  const { accessToken, refreshToken } = response.data;

  // Update users refreshToken value and return accessToken
  await UserMethods.updateOne(
    { _id: user._id },
    { refreshToken: refreshToken }
  );
  return { accessToken: accessToken };
};
