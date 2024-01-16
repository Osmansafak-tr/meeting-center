import React, { useEffect, useState } from "react";
import cookieHandler from "../../services/cookieHandler";
import { backendReqHandler } from "../../services/reqHandler";
import { useNavigate, useParams } from "react-router-dom";
import "./MyMeetingDetail.css";
import coreFunctions from "../../core/functions";
import { MeetingDetail } from "../../models/meeting";

type CardItemProps = {
  title: string;
  text: string;
};
const CardItem = (props: CardItemProps) => {
  const { title, text } = props;
  return (
    <div className="row mb-3">
      <h5 className="col-4">{title}</h5>
      <p className="col">{text}</p>
    </div>
  );
};

const MyMeetingDetail = () => {
  const [meeting, setMeeting] = useState<MeetingDetail>();
  const [loading, setLoading] = useState(true);
  const token = cookieHandler.getAuthCookie();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const headers = {
        "x-api-key": `${import.meta.env.VITE_BACKEND_SHARED_SECRET_KEY}`,
        Authorization: `Bearer ${token}`,
      };
      const response = await backendReqHandler.get(`/meetings/${id}`, headers);

      setMeeting(response.data);
      setLoading(false);
    };
    if (loading) fetch();
  }, []);

  if (loading) return <div>loading</div>;
  if (meeting) {
    return (
      <>
        <div className="my-card">
          <div className="card text-dark bg-light border-dark">
            <div className="card-header">
              <div className="row">
                <h3 className="col-8">Meeting Details</h3>
                <div className="col text-right">
                  {meeting.isStarted && meeting.isActive ? (
                    <a
                      href={`/meeting?mid=${meeting.meetingId}&pwd=${meeting.password}`}
                      target="_blank"
                      className="btn btn-success"
                    >
                      Join Meeting
                    </a>
                  ) : null}
                  {!meeting.isStarted && meeting.isActive ? (
                    <a
                      href={`/meeting?mid=${meeting.meetingId}&pwd=${meeting.password}`}
                      className="btn btn-success"
                    >
                      Start Meeting
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="col">
                <CardItem title="Topic" text={meeting.topic} />
                <CardItem
                  title="Planned Start Date"
                  text={coreFunctions.formatDate(
                    meeting.plannedStartTime,
                    "dateAndTime"
                  )}
                />
                <CardItem title="Meeting Id" text={meeting.meetingId} />
                <div className="row mb-3">
                  <h5 className="card-title col-4">Password</h5>
                  <div className="col">
                    <span className="card-text">******</span>
                    <a className="btn btn-primary btn-sm mx-3">Change</a>
                  </div>
                </div>
                {meeting.isStarted == true ? (
                  <>
                    <CardItem
                      title="Started At"
                      text={
                        coreFunctions.formatDate(meeting.startTime, "date") +
                        " - " +
                        coreFunctions.formatDate(
                          meeting.plannedStartTime,
                          "time"
                        )
                      }
                    />
                  </>
                ) : null}
                {!meeting.isActive ? (
                  <CardItem
                    title="Ended At"
                    text={
                      coreFunctions.formatDate(meeting.endTime, "date") +
                      " - " +
                      coreFunctions.formatDate(meeting.plannedStartTime, "time")
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className="card-footer card-inside">
              <span className="m-5">
                <b>Created At :</b>{" "}
                {coreFunctions.formatDate(meeting.createdAt, "dateAndTime")}
              </span>
              <span className="m-5">
                <b>Last Updated At :</b>{" "}
                {coreFunctions.formatDate(meeting.createdAt, "dateAndTime")}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  } else navigate("/");
};

export default MyMeetingDetail;
