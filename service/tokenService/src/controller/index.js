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
