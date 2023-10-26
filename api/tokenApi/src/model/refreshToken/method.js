const RefreshToken = require("./index");
const defaultSelection = "-__v";

exports.getAll = async (selection = defaultSelection) => {
  const refreshTokens = await RefreshToken.find().select(selection);
  return refreshTokens;
};

exports.getOne = async (filter, selection = defaultSelection) => {
  const refreshToken = await RefreshToken.findOne(filter).select(selection);
  return refreshToken;
};

exports.create = async (tokenContent) => {
  const refreshToken = {
    tokenContent: tokenContent,
  };
  await RefreshToken.create(refreshToken);
};

exports.update = async (filter, tokenContent) => {
  const refreshToken = await this.getOne(filter);
  if (refreshToken == null) throw new Error("Refresh token can not found.");
  refreshToken.tokenContent = tokenContent;
  refreshToken.updatedAt = Date.now();
  refreshToken.save();
};

exports.delete = async (filter) => {
  await RefreshToken.deleteOne(filter);
};
