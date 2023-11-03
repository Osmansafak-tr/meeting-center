const { JwtHandler } = require("../service");
const { UserMethods } = require("../model");
const { AppError } = require("../common/class");
const { CUSTOM_ERROR } = require("../common/constant").ErrorConstants;

exports.apiAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const sharedSecret = process.env.FRONTEND_SHARED_SECRET_KEY;
  if (apiKey === sharedSecret) next();
  else return res.status(401).json({ message: "Unauthorized api key." });
};

exports.userAuthenticate = async (req, res, next) => {
  // get access token
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next();
  const split = authHeader.split(" ");
  const accessToken = split[1];

  // verify access token
  const userId = JwtHandler.verifyAccessToken(accessToken);

  // get user
  const filter = { _id: userId };
  const errorFunction = (user) => {};
  const user = await UserMethods.getOne({
    filter: filter,
    errorFunction: errorFunction,
  });

  req.user = user;
  return next();
};

exports.userAuthorize = async (req, res, next) => {
  if (!req.user) return next(new AppError(CUSTOM_ERROR, 401, "Not Authorized"));
  else return next();
};
