const { AppError } = require("../class");

const jwtErrors = ["TokenExpiredError", "JsonWebTokenError", "NotBeforeError"];

module.exports = (error, req, res, next) => {
  if (error instanceof AppError) {
    const { message, statusCode } = error;
    const { name, errorCode } = error.errorConstant;
    const errorJson = {
      name: name,
      message: message,
      errorCode: errorCode,
    };
    return res.status(statusCode).json(errorJson);
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
