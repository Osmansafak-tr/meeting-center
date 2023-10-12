const { AccountCommands } = require("../../command");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    await AccountCommands.Login({ email, password });
    return res.status(200).json("User successfully logged in.");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
