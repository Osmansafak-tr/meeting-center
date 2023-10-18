const express = require("express");
const router = express.Router();
const controller = require("../../controller").AccountController;
const { catchError } = require("../../common/util");

router.post("/", catchError(controller.Login));

module.exports = router;
