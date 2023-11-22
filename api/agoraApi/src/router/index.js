const express = require("express");
const router = express.Router();
const { catchError } = require("../common/util");

router.get(
  "/connect/token",
  catchError((req, res) => {})
);

module.exports = router;
