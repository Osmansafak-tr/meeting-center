const commands = require("../command");

exports.ConnectToken = async (req, res) => {
  const { userId, channelName, role } = req.body;
  const result = await commands.ConnectToken(userId, channelName, role);
  return res.status(200).json(result);
};
