const { AppError } = require("../class");

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

  return res.status(500).json({ message: error.message });
};
