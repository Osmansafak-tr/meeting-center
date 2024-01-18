const { UserMethods } = require("../../model");

exports.UpdateMyProfile = async (userId, model) => {
  const filter = { _id: userId };
  await UserMethods.updateOne(filter, model);
};
