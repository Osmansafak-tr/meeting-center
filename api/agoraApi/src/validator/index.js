const { body } = require("express-validator");
const { RtcRole } = require("agora-token");

exports.ConnectToken = [
  body("channelName")
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Invalid channel name. Please try again."),
  body("role").custom(async (value) => {
    const roles = [RtcRole.PUBLISHER, RtcRole.SUBSCRIBER];

    if (value != undefined) {
      if (!Number.isInteger(value)) throw new Error("Role must be an integer.");

      const index = roles.findIndex((role) => role == value);
      if (index == -1) throw new Error("Role must be a type of RTCRole");
    }
  }),
];
