const { body, param } = require("express-validator");

exports.ConnectToken = [
  body("userId")
    .isMongoId()
    .trim()
    .withMessage("Invalid user id. Please try again."),
  body("channelName")
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Invalid channel name. Please try again."),
  body("role").custom(async (value) => {
    if (value != undefined) {
      if (!Number.isInteger(value)) throw new Error("Role must be an integer.");
    }
  }),
];
