const express = require("express");
const router = express.Router();
// My imports
const controller = require("../controller");
const validator = require("../validator");
const { catchError } = require("../common/util");
const { handleValResult } = require("../middleware");

router.post(
  "/connect/token",
  validator.ConnectToken,
  handleValResult,
  catchError(controller.ConnectToken)
);

module.exports = router;
