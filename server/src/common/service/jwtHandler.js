const jwt = require("jsonwebtoken");

exports.verifyRefreshToken = (refreshToken) => {
  const secretKey = process.env.Refresh_TOKEN_SECRET_KEY;
  const decoded = jwt.verify(refreshToken, secretKey);
  return decoded.userId;
};

exports.verifyAccessToken = (accessToken) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
  const decoded = jwt.verify(accessToken, secretKey);
  return decoded.userId;
};
