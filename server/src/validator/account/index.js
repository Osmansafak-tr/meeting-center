const { body, param } = require("express-validator");
const passwordLength = { min: 5, max: 16 };
const usernameLength = { min: 3 };
const nameLength = { max: 255 };

exports.VerifyAuth = [
  param("accessToken")
    .isString()
    .trim()
    .isJWT()
    .withMessage("Invalid jwt token."),
];

exports.Register = [
  body("username")
    .isString()
    .trim()
    .isLength(usernameLength)
    .withMessage("Usernames length should be at least 3. Please try again."),
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
  body("name")
    .isString()
    .trim()
    .isLength(nameLength)
    .withMessage(`"Invalid name. Please try again."`),
  body("surname")
    .isString()
    .trim()
    .isLength(nameLength)
    .withMessage("Invalid surname. Please try again."),
];

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
