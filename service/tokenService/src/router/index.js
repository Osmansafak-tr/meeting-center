const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.post("/connect/token", controller.GetTokens);

router.put("/refresh/token", controller.RefreshTokens);

module.exports = router;
