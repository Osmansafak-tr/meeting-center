const { RefreshTokenMethods } = require("../model");
const { JwtGenerator } = require("../common/service");

exports.GetTokens = async (userId) => {
  const tokenContent = { userId: userId };
  const accessToken = JwtGenerator.generateAccessToken(tokenContent);
  const refreshToken = JwtGenerator.generateRefreshToken(tokenContent);
  await RefreshTokenMethods.create(refreshToken);
  const tokens = { accessToken: accessToken, refreshToken: refreshToken };
  return tokens;
};
