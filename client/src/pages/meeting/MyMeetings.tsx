import React, { MouseEvent, useEffect, useState } from "react";
import { backendReqHandler } from "../../services/reqHandler";
import cookieHandler from "../../services/cookieHandler";
import coreFunctions from "../../core/functions";
import "./MyMeetings.css";
import Navbar from "../../components/Navbar";

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

  if (meetings?.length == 0)
    return (
      <>
        <Navbar />
        <div className="meeting-table">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th colSpan={4}>
                  <div className="row">
                    <span className="col">My Meetings</span>
                    <div className="col text-right">
                      <a href="/myMeetings/new" className="btn btn-info ">
                        {" "}
                        + New Meeting
                      </a>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>There are no meetings right now.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="meeting-table">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th colSpan={4}>
                <div className="row">
                  <span className="col">My Meetings</span>
                  <div className="col text-right">
                    <a href="/myMeetings/new" className="btn btn-info ">
                      {" "}
                      + New Meeting
                    </a>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {meetings?.map((meeting) => (
              <tr key={meeting._id}>
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
                <td>
                  <div className="d-grid d-sm-flex gap-3 justify-content-md-center">
                    <a
                      className="btn btn-danger"
                      onClick={async () => {
                        const url = `/meetings/${meeting._id}`;
                        await backendReqHandler.delete(url);
                        window.location.reload();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18"
                        width="16"
                        viewBox="0 0 448 512"
                      >
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                      </svg>
                    </a>
                    <a
                      className="btn btn-primary"
                      href={`/myMeetings/edit/${meeting._id}`}
                    >
                      <img src="../../../icons/pen-solid.svg" alt="" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyMeetings;
