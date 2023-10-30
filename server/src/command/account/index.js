const { UserMethods } = require("../../model");
const { RequestHandler } = require("../../common/service");
const requestHandler = RequestHandler.tokenService;

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

exports.VerifyAuth = async (accessToken) => {
  const params = { accessToken: accessToken };
  const url = `/auth/verify/${accessToken}`;
  const response = await requestHandler.get(url, params);
  return response.data;
};
