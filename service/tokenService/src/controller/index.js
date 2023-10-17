const commands = require("../command");

exports.GetTokens = async (req, res) => {
  const { userId } = req.body;
  const tokens = await commands.GetTokens(userId);
  return res.status(200).json(tokens);
};

exports.RefreshTokens = async (req, res) => {
  const { refreshToken } = req.params;
  const tokens = await commands.RefreshTokens(refreshToken);
  return res.status(200).json(tokens);
};

exports.DeleteToken = async (req, res) => {
  const { refreshToken } = req.params;
  await commands.DeleteToken(refreshToken);
  return res.status(200).json({ message: "Token successfully deleted." });
};
