const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.post("/connect/token", controller.GetTokens);

router.put("/token/:refreshToken", controller.RefreshTokens);

router.delete("/token/:refreshToken", controller.DeleteToken);

module.exports = router;
