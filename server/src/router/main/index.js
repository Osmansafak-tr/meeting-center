const express = require("express");
const router = express.Router();
const routerHandler = require("../../service/routerHandler")(router);
// Other imports
const controller = require("../../controller").MainController;
const { userAuthorize } = require("../../middleware").handleAuth;

routerHandler.get("/meetings", controller.GetMyMeetings, userAuthorize);
routerHandler.get("/meetings/:id", controller.GetMyMeetingById, userAuthorize);

routerHandler.post("/meetings", controller.CreateMyMeeting, userAuthorize);

routerHandler.put("/meetings/:id", controller.UpdateMyMeeting, userAuthorize);

routerHandler.del("/meetings/:id", controller.DeleteMyMeeting, userAuthorize);

module.exports = router;
