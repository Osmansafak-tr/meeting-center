const { AppError } = require("../../common/class");
const { ErrorConstants } = require("../../common/constant");
const { PasswordEncrypt } = require("../../service");

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
  const { topic, plannedStartTime } = req.body;
  const filter = { _id: id, userId: userId };
  await command.UpdateMyMeeting(filter, topic, plannedStartTime);
  return res.status(200).json("Meeting updated");
};

exports.UpdateMyMeetingPassword = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { password } = req.body;
  const filter = { _id: id, userId: userId };
  await command.UpdateMyMeetingPassword(filter, password);
  return res.status(200).json("Meeting updated");
};

exports.DeleteMyMeeting = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  await command.DeleteMyMeeting(id, userId);
  return res.status(200).json("Meeting deleted");
};

exports.TryJoinMeeting = async (req, res) => {
  const { meetingId, password } = req.body;
  const meeting = await command.TryJoinMeeting(meetingId, password);
  return res.status(200).json(meeting);
};

exports.GetMeetingByMeetingIdAndPassword = async (req, res) => {
  const { meetingId, password } = req.body;
  const meeting = await command.GetMeetingByMeetingIdAndPassword(
    meetingId,
    password
  );
  return res.status(200).json(meeting);
};

exports.JoinMeeting = async (req, res) => {
  const { name, meetingId } = req.body;
  const userId = req.user != null ? req.user._id : null;
  const result = await command.JoinMeeting(meetingId, name, userId);
  return res.status(200).json(result);
};

exports.LeaveMeeting = async (req, res) => {
  const { meetingId, agoraId } = req.body;
  await command.LeaveMeeting(meetingId, agoraId);
  return res.status(200).json("Leaved meeting");
};
