const jwt = require("jsonwebtoken");
const defaultTokenOpt = { expiresIn: "48h" };

const generateToken = (tokenContent, secretKey, tokenOpt = defaultTokenOpt) => {
  return jwt.sign(tokenContent, secretKey, tokenOpt);
};

exports.generateAccessToken = (tokenContent) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
  const accessToken = generateToken(tokenContent, secretKey);
  return accessToken;
};

exports.generateRefreshToken = (tokenContent) => {
  const secretKey = process.env.Refresh_TOKEN_SECRET_KEY;
  const tokenOpt = { expiresIn: "60h" };
  const refreshToken = generateToken(tokenContent, secretKey, tokenOpt);
  return refreshToken;
};

exports.generateBothTokens = (tokenContent) => {
  const accessToken = this.generateAccessToken(tokenContent);
  const refreshToken = this.generateRefreshToken(tokenContent);
  const tokens = { accessToken: accessToken, refreshToken: refreshToken };
  return tokens;
};

exports.verifyRefreshToken = (refreshToken) => {
  const secretKey = process.env.Refresh_TOKEN_SECRET_KEY;
  const decoded = jwt.verify(refreshToken, secretKey);
  return decoded.userId;
};
