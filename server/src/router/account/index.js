const express = require("express");
const router = express.Router();
const controller = require("../../controller").AccountController;
const validator = require("../../validator").AccountValidator;
const { catchError } = require("../../common/util");
const middlewares = require("../../middleware");
const { handleValResult } = middlewares;
const { userAuthorize } = middlewares.handleAuth;

router.get("/auth/verify/:accessToken", catchError(controller.VerifyAuth));

router.post(
  "/",
  validator.Login,
  handleValResult,
  catchError(controller.Login)
);
router.post("/register", catchError(controller.Register));
router.post("/logout", userAuthorize, catchError(controller.Logout));

module.exports = router;
