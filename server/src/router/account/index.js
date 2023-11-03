const express = require("express");
const router = express.Router();
const routerHandler = require("../../service/routerHandler")(router);
// Other imports
const controller = require("../../controller").AccountController;
const validator = require("../../validator").AccountValidator;
const middlewares = require("../../middleware");
const { userAuthorize } = middlewares.handleAuth;

routerHandler.getVal(
  "/auth/verify/:accessToken",
  validator.VerifyAuth,
  controller.VerifyAuth
);

routerHandler.postVal("/", validator.Login, controller.Login);
routerHandler.postVal("/register", validator.Register, controller.Register);
routerHandler.post("/logout", controller.Logout, userAuthorize);

module.exports = router;
