const { AccountCommands } = require("../../command");

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const tokenJson = await AccountCommands.Login({ email, password });
  return res.status(200).json(tokenJson);
};
