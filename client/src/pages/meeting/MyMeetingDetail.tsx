import React, { useEffect, useState } from "react";
import cookieHandler from "../../services/cookieHandler";
import { backendReqHandler } from "../../services/reqHandler";
import { useNavigate, useParams } from "react-router-dom";
import "./MyMeetingDetail.css";
import coreFunctions from "../../core/functions";

type Meeting = {
  _id: string;
  meetingId: string;
  password: string;
  topic: string;
  plannedStartTime: Date;
  startTime: Date;
  endTime: Date;
  isStarted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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
  const [meeting, setMeeting] = useState<Meeting>();
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
          <div className="card text-bg-light">
            <div className="card-header">
              <h3>Meeting Details</h3>
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
                    <CardItem
                      title="Ended At"
                      text={
                        coreFunctions.formatDate(meeting.endTime, "date") +
                        " - " +
                        coreFunctions.formatDate(
                          meeting.plannedStartTime,
                          "time"
                        )
                      }
                    />
                  </>
                ) : null}
              </div>
            </div>
            <div className="card-footer">
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
