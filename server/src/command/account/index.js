const { UserMethods } = require("../../model");
const { PasswordEncrypt } = require("../../common/service");

exports.Login = async (formUser) => {
  const filter = { email: formUser.email };
  const user = await UserMethods.getOne(filter);
  if (user == null) throw new Error("Invalid email");
  const result = await PasswordEncrypt.verify(formUser.password, user.password);
  if (!result) throw new Error("Invalid password");
};
