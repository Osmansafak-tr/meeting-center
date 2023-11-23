const crypto = require("crypto");

exports.apiAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const sharedSecret = process.env.X_API_KEY;

  if (apiKey == sharedSecret) next();
  else return res.status(401).json({ message: "Api authentication failed." });
};
