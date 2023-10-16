const commands = require("../command");

exports.GetTokens = async (req, res) => {
  try {
    const { userId } = req.body;
    const tokens = await commands.GetTokens(userId);
    return res.status(200).json(tokens);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

exports.RefreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.params;
    const tokens = await commands.RefreshTokens(refreshToken);
    return res.status(200).json(tokens);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

exports.DeleteToken = async (req, res) => {
  try {
    const { refreshToken } = req.params;
    await commands.DeleteToken(refreshToken);
    return res.status(200).json({ message: "Token successfully deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
