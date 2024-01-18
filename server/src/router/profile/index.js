const express = require("express");
const router = express.Router();
const routerHandler = require("../../service/routerHandler")(router);
// Other imports
const controller = require("../../controller").ProfileController;
const middlewares = require("../../middleware");
const { userAuthorize } = middlewares.handleAuth;

routerHandler.get("/", controller.GetMyProfile, userAuthorize);
routerHandler.put("/", controller.UpdateMyProfile, userAuthorize);

module.exports = router;
