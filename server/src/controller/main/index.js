const command = require("../../command").MainCommands;

exports.GetMyMeetings = async (req, res) => {
  const userId = req.user._id;
  const meetings = await command.GetMyMeetings(userId);
  return res.status(200).json(meetings);
};

exports.GetMyMeetingById = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const meeting = await command.GetMyMeetingById(id, userId);
  return res.status(200).json(meeting);
};

exports.CreateMyMeeting = async (req, res) => {
  const userId = req.user._id;
  const { password, topic, plannedStartTime } = req.body;
  await command.CreateMyMeeting(password, topic, plannedStartTime, userId);
  return res.status(200).json("Meeting created");
};

exports.UpdateMyMeeting = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { password, topic, plannedStartTime } = req.body;
  const filter = { _id: id, userId: userId };
  await command.UpdateMyMeeting(filter, password, topic, plannedStartTime);
  return res.status(200).json("Meeting updated");
};

exports.DeleteMyMeeting = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  await command.DeleteMyMeeting(id, userId);
  return res.status(200).json("Meeting deleted");
};
