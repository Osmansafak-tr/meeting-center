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
const TOKEN = import.meta.env.VITE_AGORA_TOKEN;

const MeetingApp: React.FC = () => {
  const [localTracks, setLocalTracks] = useState<
    [IMicrophoneAudioTrack | null, ICameraVideoTrack | null]
  >([null, null]);
  const [remoteUsers, setRemoteUsers] = useState<{ [key: number]: any }>({});
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
    if (isReady) getToken();
  }, [isReady]);

  useEffect(() => {
    const joinAndDisplayLocalScreen = async () => {
      client.on("user-published", handleRemoteUserJoin);
      client.on("user-left", handleUserLeft);

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
    if (client.connectionState == "DISCONNECTED" && loading && token != "")
      joinAndDisplayLocalScreen();
  }, [token]);

  useEffect(() => {
    const track = async () => {
      if (localUid) {
        console.log("LocalUid : ", localUid);
        const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks(tracks);

        tracks[1].play(`user-${localUid}`);
        await client.publish([tracks[0], tracks[1]]);
      }
    };
    track();
  }, [localUid]);

  useEffect(() => {
    if (remoteUser) {
      remoteUser.videoTrack.play(`user-${remoteUser.uid}`);
      setClient(client);
    }
  }, [remoteUser]);

  const handleRemoteUserJoin = async (
    user: any,
    mediaType: "video" | "audio"
  ) => {
    console.log("User Id : ", user.uid);
    setRemoteUsers((prevUsers) => ({ ...prevUsers, [user.uid]: user }));
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      // setVideoStreams((prevStreams) =>
      //   prevStreams.filter(
      //     (stream) => stream.key !== `user-container-${user.uid}`
      //   )
      // );

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
  };

  const handleUserLeft = async (user: any) => {
    setRemoteUsers((prevUsers) => {
      const newUsers = { ...prevUsers };
      delete newUsers[user.uid];
      return newUsers;
    });

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
      setClient(client);
    }
  };
  const toggleCam = async () => {
    if (localTracks[1]) {
      await localTracks[1].setMuted(camStatus);
      setCamStatus((prevStatus) => !prevStatus);
      setClient(client);
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
