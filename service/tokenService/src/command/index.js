const { RefreshTokenMethods } = require("../model");
const { JwtGenerator } = require("../common/service");

exports.GetTokens = async (userId) => {
  const tokenContent = { userId: userId };
  const tokens = JwtGenerator.generateBothTokens(tokenContent);
  await RefreshTokenMethods.create(tokens.refreshToken);
  return tokens;
};

exports.RefreshTokens = async (refreshToken) => {
  const userId = JwtGenerator.verifyRefreshToken(refreshToken);
  const tokenContent = { userId: userId };
  const tokens = JwtGenerator.generateBothTokens(tokenContent);
  await RefreshTokenMethods.update(
    { tokenContent: refreshToken },
    tokens.refreshToken
  );
  return tokens;
};

exports.DeleteToken = async (refreshToken) => {
  const filter = { tokenContent: refreshToken };
  await RefreshTokenMethods.delete(filter);
};
