const { validationResult } = require("express-validator");
const { ValidationError } = require("../common/class");
// const customValidationResult = validationResult.withDefaults({
//   formatter: (error) => error.msg,
// });

module.exports = (req, res, next) => {
  const result = validationResult(req);
  //   if (!result.isEmpty()) result.throw();
  if (!result.isEmpty()) {
    const errors = result.array();
    throw new ValidationError(errors);
  }

  return next();
};
