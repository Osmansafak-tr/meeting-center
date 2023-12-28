const { MeetingMethods } = require("../../model");
const { PasswordEncrypt } = require("../../service");
const { agoraApiReqHandler } = require("../../service/requestHandler");

exports.GetMyMeetings = async (userId) => {
  const filter = {
    userId: userId,
  };
  const meetings = await MeetingMethods.getAll(filter);
  return meetings;
};

exports.GetMyMeetingById = async (id, userId) => {
  const filter = {
    _id: id,
    userId: userId,
  };
  const meeting = await MeetingMethods.getOne(filter);
  return meeting;
};

const createMeetingId = () => {
  const min = Math.pow(10, 8);
  const max = Math.pow(10, 9);
  return Math.floor(Math.random() * (max - min) + min);
};

exports.CreateMyMeeting = async (password, topic, plannedStartTime, userId) => {
  const meetingId = createMeetingId();
  const hashedPassword = await PasswordEncrypt.hash(password);
  const model = {
    meetingId: meetingId,
    password: hashedPassword,
    userId: userId,
    topic: topic,
    plannedStartTime: plannedStartTime,
  };
  await MeetingMethods.create(model);
};

exports.UpdateMyMeeting = async (filter, password, topic, plannedStartTime) => {
  const hashedPassword = await PasswordEncrypt.hash(password);
  const model = {
    password: hashedPassword,
    topic: topic,
    plannedStartTime: plannedStartTime,
  };
  await MeetingMethods.update(filter, model);
};

exports.DeleteMyMeeting = async (id, userId) => {
  const filter = { _id: id, userId: userId };
  await MeetingMethods.delete(filter);
};

exports.JoinMeeting = async (meetingId, name, userId) => {
  const url = "/connect/token";
  const body = {
    channelName: meetingId,
  };
  const response = await agoraApiReqHandler.post(url, body);
  const { token, uid } = response.data;

  const participant = {
    name: name,
    agoraId: uid,
    userId: userId,
  };
  const filter = { meetingId: meetingId, isActive: true };
  await MeetingMethods.join(filter, participant);
  return { token: token, uid: uid };
};

exports.LeaveMeeting = async (meetingId, agoraId) => {
  const filter = { meetingId: meetingId, isActive: true };
  await MeetingMethods.leave(filter, agoraId);
};
