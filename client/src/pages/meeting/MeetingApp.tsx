import React, { useState, useEffect } from "react";
import AgoraRTC, {
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCClient,
  UID,
} from "agora-rtc-sdk-ng"; // Import AgoraRTC library if not already done
import "./meetingApp.css";
import { backendReqHandler } from "../../services/reqHandler";
import { Meeting } from "../../models/meeting";

const APP_ID = import.meta.env.VITE_AGORA_APP_ID;

const MeetingApp: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const meetingId = queryParams.get("mid");
  const password = queryParams.get("pwd");

  if (!meetingId) return <div>Mid is not defined</div>;

  const [meeting, setMeeting] = useState<Meeting>();
  const [waitForMeetingStart, setWaitForMeetingStart] = useState(false);
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

  const getMeeting = async () => {
    const url = `/meeting/get`;
    const body = {
      meetingId: meetingId,
      password: password,
    };
    const response = await backendReqHandler.post(url, body);
    const meeting: Meeting = response.data;
    console.log("Meeting", meeting);
    return meeting;
  };

  useEffect(() => {
    setIsReady(!isReady);
  }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const url = "/meeting/join";
        const body = {
          meetingId: meetingId,
          name: "name",
        };
        const response = await backendReqHandler.post(url, body);
        const { token, uid } = response.data;
        const meeting = await getMeeting();
        if (!meeting.isStarted) {
          setLoading(false);
          return;
        }
        setMeeting(meeting);
        setUid(uid);
        setToken(token);
      } catch (error: any) {
        if (error.response.data.errorCode == 501) {
          setLoading(false);
          setWaitForMeetingStart(true);
        }
      }
    };
    const joinAndDisplayLocalScreen = async () => {
      client.on("user-published", handleRemoteUserJoin);
      client.on("user-left", handleUserLeft);
      client.on("user-unpublished", handleUserLeft);
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
      window.addEventListener("beforeunload", (ev) => {
        const func = async () => {
          await leaveAndRemoveLocalStream();
        };
        func();
      });

      const UID = await client.join(APP_ID, meetingId, token, uid);

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
    setMeeting(await getMeeting());
    setRemoteUsers(temp);
  };

  const handleUserLeft = async (user: any) => {
    const temp = remoteUsers.filter((value) => value != user.uid);
    const meeting = await getMeeting();
    setMeeting(meeting);
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
    const url = "/meeting/leave";
    const body = {
      meetingId: meetingId,
      agoraId: uid,
    };
    await backendReqHandler.post(url, body);
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

  if (waitForMeetingStart) return <div>Meeting is not Started</div>;

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
          <button>Participants {meeting?.participants.length}</button>
        </div>
      </div>
    </>
  );
};

export default MeetingApp;
