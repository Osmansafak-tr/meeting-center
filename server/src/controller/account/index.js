const { AccountCommands } = require("../../command");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokenJson = await AccountCommands.Login({ email, password });
    return res.status(200).json(tokenJson);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
