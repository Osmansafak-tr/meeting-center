module.exports = (error, req, res, next) => {
  console.log(error);
  if (error.errors) {
    const result = {
      errors: error.errors,
    };
    return res.status(401).json(result);
  }
  return res.status(500).json({ message: error.message });
};
