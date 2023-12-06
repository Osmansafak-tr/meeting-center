const commands = require("../command");

const getRandomUid = () => {
  const min = Math.pow(10, 8);
  const max = Math.pow(10, 9);
  return Math.floor(Math.random() * (max - min) + min);
};

exports.ConnectToken = async (req, res) => {
  const { channelName, role } = req.body;
  const uid = getRandomUid();
  const { token } = await commands.ConnectToken(uid, channelName, role);
  const result = {
    uid: uid,
    token: token,
  };
  return res.status(200).json(result);
};
