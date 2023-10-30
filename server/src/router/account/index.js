const express = require("express");
const router = express.Router();
const controller = require("../../controller").AccountController;
const { catchError } = require("../../common/util");

router.get("/auth/verify/:accessToken", catchError(controller.VerifyAuth));

router.post("/", catchError(controller.Login));

module.exports = router;
