const { AgoraTokenMethods } = require("../model");
const { RtcRole, RtcTokenBuilder } = require("agora-token");

exports.ConnectToken = async (userId, channelName, roleParam) => {
  const role = roleParam || RtcRole.SUBSCRIBER;
  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const agoraToken = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    userId,
    role,
    privilegeExpiredTs
  );

  await AgoraTokenMethods.create(agoraToken);
};
