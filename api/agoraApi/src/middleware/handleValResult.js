const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) result.throw();
  // if (!result.isEmpty()) {
  //   const errors = result.array();
  //   throw new Error(errors);
  // }

  return next();
};
