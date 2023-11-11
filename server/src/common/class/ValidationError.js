const { VALIDATION_ERROR } = require("../constant").ErrorConstants;
const AppError = require("./AppError");

class ValidationError extends AppError {
  constructor(errors) {
    super();
    this.errorConstant = VALIDATION_ERROR;
    this.statusCode = 400;
    this.errors = errors;
  }
}

module.exports = ValidationError;
