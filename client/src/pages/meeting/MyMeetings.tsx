import React, { useEffect, useState } from "react";
import { backendReqHandler } from "../../services/reqHandler";
import cookieHandler from "../../services/cookieHandler";
import coreFunctions from "../../core/functions";
import "./MyMeetings.css";

// type Participant = {
//   isAuthenticated: boolean;
//   agoraId: Number;
//   userId: string;
// };

type Meeting = {
  _id: string;
  meetingId: string;
  userId: string;
  topic: string;
  plannedStartTime: Date;
  isStarted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const MyMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>();
  const [loading, setLoading] = useState(true);
  const token = cookieHandler.getAuthCookie();
  useEffect(() => {
    const fetch = async () => {
      const headers = {
        "x-api-key": `${import.meta.env.VITE_BACKEND_SHARED_SECRET_KEY}`,
        Authorization: `Bearer ${token}`,
      };
      const response = await backendReqHandler.get("/meetings", headers);
      console.log(response.data);
      setMeetings(response.data);
      setLoading(false);
    };
    if (loading) fetch();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="meeting-table">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th colSpan={3}>My Meetings</th>
            </tr>
          </thead>
          <tbody>
            {meetings?.map((meeting) => (
              <tr>
                <td>
                  <a href={"/myMeetings/" + meeting._id}>{meeting.topic}</a>
                </td>
                <td>{meeting.meetingId}</td>
                <td>
                  {coreFunctions.formatDate(
                    meeting.plannedStartTime,
                    "dateAndTime"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </>
  );
};

export default MyMeetings;
