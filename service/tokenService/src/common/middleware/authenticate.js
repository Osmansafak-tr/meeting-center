module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  const sharedSecret = process.env.BACKEND_SHARED_SECRET_KEY;

  if (token === sharedSecret) next();
  else return res.status(401).json({ message: "Unauthorized" });
};
