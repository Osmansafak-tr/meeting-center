const { UserMethods } = require("../../model");
const { PasswordEncrypt, RequestHandler } = require("../../common/service");
const requestHandler = RequestHandler.tokenService;

exports.Login = async (formUser) => {
  const filter = { email: formUser.email };
  const user = await UserMethods.getOne(filter);
  if (user == null) throw new Error("Invalid email");
  const result = await PasswordEncrypt.verify(formUser.password, user.password);
  if (!result) throw new Error("Invalid password");

  const body = { userId: user._id };
  const response = await requestHandler.post("/connect/token", body);
  const tokens = response.data;
  console.log(tokens.accessToken);
  console.log(tokens.refreshToken);
};
