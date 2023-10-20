const ErrorNames = require("./errorName");

class ErrorConstant {
  constructor(name, errorCode) {
    this.name = name;
    this.errorCode = errorCode;
  }
}

module.exports = {
  CUSTOM_ERROR: new ErrorConstant(ErrorNames.CUSTOM, 100),
  FORM_ERROR: new ErrorConstant(ErrorNames.FORM, 200),
  INVALID_EMAIL: new ErrorConstant(ErrorNames.FORM, 201),
  INVALID_PASSWORD: new ErrorConstant(ErrorNames.FORM, 202),
  DATA_ERROR: new ErrorConstant(ErrorNames.Data, 300),
  DATA_NOT_FOUND: new ErrorConstant(ErrorNames.Data, 301),
};
