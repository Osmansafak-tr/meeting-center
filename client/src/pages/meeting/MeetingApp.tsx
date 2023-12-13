import React, { useState, useEffect, useRef } from "react";
import AgoraRTC, {
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCClient,
  UID,
} from "agora-rtc-sdk-ng"; // Import AgoraRTC library if not already done
import "./meetingApp.css";
import { agoraApiReqHandler } from "../../services/reqHandler";

const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
const CHANNEL = "test";

const MeetingApp: React.FC = () => {
  const [localTracks, setLocalTracks] = useState<
    [IMicrophoneAudioTrack | null, ICameraVideoTrack | null]
  >([null, null]);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [micStatus, setMicStatus] = useState<boolean>(true);
  const [camStatus, setCamStatus] = useState<boolean>(true);
  const [videoStreams, setVideoStreams] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const [isReady, setIsReady] = useState(false);
  const [uid, setUid] = useState<number>();
  const [localUid, setLocalUid] = useState<UID>();
  const [remoteUser, setRemoteUser] = useState<any>(null);

  const [client, setClient] = useState<IAgoraRTCClient>(
    AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    })
  );

  useEffect(() => {
    setIsReady(!isReady);
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const url = "/connect/token";
      const body = {
        userId: "123567890123456789012345",
        channelName: "test",
      };
      const response = await agoraApiReqHandler.post(url, body);
      const { token, uid } = response.data;
      setUid(uid);
      setToken(token);
    };
    const joinAndDisplayLocalScreen = async () => {
      client.on("user-published", handleRemoteUserJoin);
      client.on("user-left", handleUserLeft);
      client.on("user-info-updated", (uid, msg) => {
        const unmuteVideo = () => {
          const user = client.remoteUsers.find((user) => {
            return user.uid === uid;
          });
          user?.videoTrack?.play(`user-${uid}`);
        };
        if (msg === "unmute-video") {
          unmuteVideo();
        }
      });

      const UID = await client.join(APP_ID, CHANNEL, token, uid);

      const player = (
        <div className="video-container" id={`user-container-${UID}`} key={UID}>
          <div className="video-player" id={`user-${UID}`}></div>
        </div>
      );

      setVideoStreams((prevStreams) => [...prevStreams, player]);

      setClient(client);
      setLocalUid(UID);
      setLoading(false);
    };
    const track = async () => {
      if (localUid) {
        const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

        tracks[1].play(`user-${localUid}`);
        setLocalTracks(tracks);
        await client.publish([tracks[0], tracks[1]]);
        setClient(client);
      }
    };
    if (isReady && !token) getToken();
    if (client.connectionState == "DISCONNECTED" && loading && token != "")
      joinAndDisplayLocalScreen();
    if (localUid && token) track();
  }, [isReady, token, localUid]);

  useEffect(() => {
    if (remoteUser) {
      remoteUser.videoTrack.play(`user-${remoteUser.uid}`);
    }
  }, [remoteUser]);

  const handleRemoteUserJoin = async (
    user: any,
    mediaType: "video" | "audio"
  ) => {
    console.log("Remote user join : ", user.uid);

    setRemoteUsers((prevUsers) => ({ ...prevUsers, [user.uid]: user }));
    for (const i in remoteUsers) {
      console.log("Remote users : ", remoteUsers[i]);
      if (remoteUsers[i] == user.uid) {
        console.log("same remote user : ", user.uid);
        return;
      }
    }
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      const player = (
        <div
          className="video-container"
          id={`user-container-${user.uid}`}
          key={user.uid}
        >
          <div className="video-player" id={`user-${user.uid}`}></div>
        </div>
      );
      setVideoStreams((prevStreams) => [...prevStreams, player]);
      setRemoteUser(user);
    }

    if (mediaType === "audio") user.audioTrack.play();

    const temp = remoteUsers;
    temp.push(user.uid);
    setRemoteUsers(temp);
  };

  const handleUserLeft = async (user: any) => {
    const temp = remoteUsers.filter((value) => value != user.uid);
    setRemoteUsers(temp);

    setVideoStreams((prevStreams) =>
      prevStreams.filter((stream) => stream.key !== `${user.uid}`)
    );
  };

  const leaveAndRemoveLocalStream = async () => {
    for (let i = 0; i < localTracks.length; i++) {
      if (localTracks[i]) {
        await localTracks[i]?.stop();
        await localTracks[i]?.close();
      }
    }
    await client.leave();
  };

  const toggleMic = async () => {
    if (localTracks[0]) {
      await localTracks[0].setMuted(micStatus);
      setMicStatus((prevStatus) => !prevStatus);
    }
  };
  const toggleCam = async () => {
    if (localTracks[1]) {
      await localTracks[1].setMuted(camStatus);
      setCamStatus((prevStatus) => !prevStatus);
    }
  };

  if (loading) return <div>Loading</div>;

  return (
    <>
      <div>
        <button onClick={() => setVideoStreams([])}>Clear Streams</button>
        <div id="video-streams">{videoStreams}</div>
        <div>
          <button onClick={toggleMic}>
            {micStatus ? "Mic On" : "Mic Off"}
          </button>
          <button onClick={toggleCam}>
            {camStatus ? "Cam On" : "Cam Off"}
          </button>
          <button onClick={leaveAndRemoveLocalStream}>Leave</button>
        </div>
      </div>
    </>
  );
};

export default MeetingApp;
