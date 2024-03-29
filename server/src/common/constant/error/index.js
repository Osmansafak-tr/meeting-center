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
  INVALID_USERNAME: new ErrorConstant(ErrorNames.FORM, 203),
  INVALID_MEETING_ID: new ErrorConstant(ErrorNames.FORM, 204),
  DATA_ERROR: new ErrorConstant(ErrorNames.DATA, 300),
  DATA_NOT_FOUND: new ErrorConstant(ErrorNames.DATA, 301),
  VALIDATION_ERROR: new ErrorConstant(ErrorNames.VALIDATION, 400),
  MEETING_ERROR: new ErrorConstant(ErrorNames.MEETING, 500),
  MEETING_IS_NOT_STARTED: new ErrorConstant(ErrorNames.MEETING, 501),
};
