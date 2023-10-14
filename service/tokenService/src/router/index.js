const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/connect/token", controller.GetTokens);

module.exports = router;
