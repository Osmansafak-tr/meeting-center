const { AppError, ValidationError } = require("../common/class");
const {} = require("express-validator");

const jwtErrors = ["TokenExpiredError", "JsonWebTokenError", "NotBeforeError"];

module.exports = (error, req, res, next) => {
  console.log(error);
  if (error instanceof AppError) {
    const { statusCode } = error;
    const result = handleAppErrors(error);
    return res.status(statusCode).json(result);
  }

  if (error.name === "AxiosError") {
    const { data } = error.response;
    jwtErrors.forEach((error) => {
      if (data.name === error) return res.status(400).json(data);
    });
    return res.status(500).json(data);
  }

  return res.status(500).json({ message: error.message });
};

const handlerValidationErrors = (name, errorCode, errors) => {
  const errorJson = {
    name: name,
    errorCode: errorCode,
    errors: errors,
  };
  return errorJson;
};

const handleAppErrors = (error) => {
  const { message, errors } = error;
  const { name, errorCode } = error.errorConstant;

  if (error instanceof ValidationError)
    return handlerValidationErrors(name, errorCode, errors);

  const errorJson = {
    name: name,
    message: message,
    errorCode: errorCode,
  };
  return errorJson;
};
