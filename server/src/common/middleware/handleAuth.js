exports.apiAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  console.log(apiKey);
  const sharedSecret = process.env.FRONTEND_SHARED_SECRET_KEY;
  if (apiKey === sharedSecret) next();
  else return res.status(401).json({ message: "Unauthorized api key." });
};
