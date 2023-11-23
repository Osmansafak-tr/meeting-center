const express = require("express");
const router = express.Router();
const { catchError } = require("../common/util");
const controller = require("../controller");

router.post("/connect/token", catchError(controller.ConnectToken));

module.exports = router;
