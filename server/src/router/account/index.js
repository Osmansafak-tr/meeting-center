const express = require("express");
const router = express.Router();
const controller = require("../../controller").AccountController;
const { catchError } = require("../../common/util");
const { userAuthorize } = require("../../common/middleware").handleAuth;

router.get("/auth/verify/:accessToken", catchError(controller.VerifyAuth));

router.post("/", catchError(controller.Login));
router.post("/register", catchError(controller.Register));
router.post("/logout", userAuthorize, catchError(controller.Logout));

module.exports = router;
