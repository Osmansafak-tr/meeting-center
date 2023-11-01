const { AccountCommands } = require("../../command");

exports.VerifyAuth = async (req, res) => {
  const { accessToken } = req.params;
  const data = await AccountCommands.VerifyAuth(accessToken);
  return res.status(200).json(data);
};

exports.Register = async (req, res) => {
  const { username, email, password, name, surname } = req.body;
  const model = {
    username: username,
    email: email,
    password: password,
    name: name,
    surname: surname,
  };
  await AccountCommands.Register(model);
  return res.status(200).json({ message: "User successfully created." });
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const tokenJson = await AccountCommands.Login(email, password);
  return res.status(200).json(tokenJson);
};

exports.Logout = async (req, res) => {
  const { refreshToken, _id } = req.user;
  await AccountCommands.Logout(_id, refreshToken);
  return res.status(200).json({ message: "User successfully logged out." });
};
