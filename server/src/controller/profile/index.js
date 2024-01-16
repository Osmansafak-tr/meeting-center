const commands = require("../../command").ProfileCommands;

exports.GetMyProfile = async (req, res) => {
  const { user } = req;
  return res.status(200).json(user);
};

exports.UpdateMyProfile = async (req, res) => {
  const userId = req.user._id;
  const { screenName, name, surname } = req.body;
  const updateModel = {
    screenName: screenName,
    name: name,
    surname: surname,
  };
  await commands.UpdateMyProfile(userId, updateModel);
  return res.status(200).json("User updated");
};
