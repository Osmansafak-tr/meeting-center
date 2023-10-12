const express = require("express");
const router = express.Router();
const controller = require("../../controller").AccountController;

router.post("/", controller.Login);

module.exports = router;
