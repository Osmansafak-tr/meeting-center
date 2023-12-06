const { AgoraTokenMethods } = require("../model");
const { RtcRole, RtcTokenBuilder } = require("agora-token");

exports.ConnectToken = async (uid, channelName, role) => {
  role = role || RtcRole.SUBSCRIBER;
  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const agoraToken = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  await AgoraTokenMethods.create(agoraToken);
  return { token: agoraToken };
};
