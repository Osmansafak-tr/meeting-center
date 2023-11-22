const AgoraToken = require("./index");
const defaultSelection = "-__v";

exports.getAll = async (selection = defaultSelection) => {
  const agoraTokens = await AgoraToken.find().select(selection);
  return agoraTokens;
};

exports.getOne = async (filter, selection = defaultSelection) => {
  const agoraToken = await AgoraToken.findOne(filter).select(selection);
  return agoraToken;
};

exports.create = async (tokenContent) => {
  const agoraToken = {
    tokenContent: tokenContent,
  };
  await AgoraToken.create(agoraToken);
};

exports.update = async (filter, tokenContent) => {
  const agoraToken = await this.getOne(filter);
  if (agoraToken == null) throw new Error("Agora token can not found.");
  agoraToken.tokenContent = tokenContent;
  agoraToken.updatedAt = Date.now();
  agoraToken.save();
};

exports.delete = async (filter) => {
  await AgoraToken.deleteOne(filter);
};
