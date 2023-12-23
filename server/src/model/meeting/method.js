const { AppError } = require("../../common/class");
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
