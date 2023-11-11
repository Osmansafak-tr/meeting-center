const { CUSTOM_ERROR } = require("../constant").ErrorConstants;

class AppError extends Error {
  constructor(errorConstant = CUSTOM_ERROR, statusCode = 500, message) {
    super(message);
    this.errorConstant = errorConstant;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
