const { body, check } = require("express-validator");
const passwordLength = { min: 5, max: 16 };

exports.Login = [
  body("email")
    .isString()
    .trim()
    .isEmail()
    .withMessage("Invalid email. Please try again."),
  body("password")
    .isString()
    .trim()
    .isLength(passwordLength)
    .withMessage("Invalid password. Please try again."),
];
