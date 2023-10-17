const express = require("express");
const router = express.Router();
const controller = require("../controller");
const { catchError } = require("../common/util");

router.post("/connect/token", catchError(controller.GetTokens));

router.put("/token/:refreshToken", catchError(controller.RefreshTokens));

router.delete("/token/:refreshToken", catchError(controller.DeleteToken));

module.exports = router;
