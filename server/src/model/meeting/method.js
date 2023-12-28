const { AppError } = require("../../common/class");
const { MEETING_IS_NOT_STARTED } =
  require("../../common/constant").ErrorConstants;
const { DATA_NOT_FOUND } = require("../../common/constant/error");
const { updateObject } = require("../function");
const Meeting = require("./index");
const defaultSelection = "-__v";

exports.getAll = async (filter = {}, selection = defaultSelection) => {
  const meetings = await Meeting.find(filter).select(selection);
  return meetings;
};

exports.getOne = async (filter, selection = defaultSelection) => {
  const meeting = await Meeting.findOne(filter).select(selection);
  if (meeting == null)
    throw new AppError(DATA_NOT_FOUND, 404, "Meeting not found.");
  return meeting;
};

exports.create = async (model) => {
  await Meeting.create(model);
};

exports.update = async (filter, model) => {
  let meeting = await this.getOne(filter);
  if (meeting == null) throw new Error("Meeting can not found.");
  updateObject(meeting, model);
  await meeting.save();
};

exports.delete = async (filter) => {
  const doc = await Meeting.deleteOne(filter);
  if (doc.deletedCount == 0)
    throw new AppError(DATA_NOT_FOUND, 404, "Meeting not found.");
};

exports.join = async (filter, participant) => {
  const meeting = await this.getOne(filter);
  const participants = [...meeting.participants, participant];
  let updateModel = {};
  if (participant.userId?.toString() === meeting.userId.toString())
    updateModel = {
      participants: participants,
      isStarted: true,
      startTime: meeting.isStarted == false ? Date.now() : undefined,
    };
  else {
    if (meeting.isStarted == false)
      throw new AppError(
        MEETING_IS_NOT_STARTED,
        400,
        "Meeting is not started."
      );
    updateModel = {
      participants: participants,
    };
  }

  await this.update(filter, updateModel);
};

exports.leave = async (filter, agoraId) => {
  const meeting = await this.getOne(filter);
  const participants = meeting.participants;
  for (i in participants) {
    const participant = participants[i];
    if (participant.agoraId === agoraId) {
      participants.splice(i, 1);
      break;
    }
  }

  let updateModel = {};

  if (participants.length == 0)
    updateModel = {
      participants: participants,
      isActive: false,
      endTime: Date.now(),
    };
  else
    updateModel = {
      participants: participants,
    };

  await this.update(filter, updateModel);
};
