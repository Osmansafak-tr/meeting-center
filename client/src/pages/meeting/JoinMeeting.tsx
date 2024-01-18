import React, { ChangeEvent, useState } from "react";
import FormInput from "../../components/FormInput";
import "./joinMeeting.css";
import { backendReqHandler } from "../../services/reqHandler";
import Navbar from "../../components/Navbar";

const JoinMeeting = () => {
  const [meetingId, setMeetingId] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ meetingId: "", password: "" });

  const onMeetingIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeetingId(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const getMeeting = async () => {
    const url = `/meeting/tryJoin`;
    const body = {
      meetingId: meetingId,
      password: password,
    };
    const response = await backendReqHandler.post(url, body);
    console.log(response.data);
    return response.data;
  };

  const onButtonClick = async () => {
    try {
      const meeting = await getMeeting();
      console.log(meeting);
      window.open(`/meeting?mid=${meetingId}&pwd=${meeting.password}`);
      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data.message);
      handleReqError(error);
    }
  };

  const handleReqError = (error: any) => {
    console.log(error);
    const { data } = error.response;
    const { errorCode, name } = data;
    if (name === "FormError") {
      const { message } = data;
      const err = { meetingId: "", password: "" };
      if (errorCode == 204) err.meetingId = message;
      else if (errorCode == 202) err.password = message;
      console.log("Err: ", err);
      setFormErrors(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-login">
        <h2>Join Meeting</h2>
        <form>
          {/* Meeting Id input */}
          <FormInput
            inputId="meetingId"
            inputType="text"
            placeholder="Meeting Id"
            labelText="Meeting Id"
            onChange={onMeetingIdChange}
            errorMessage={formErrors.meetingId}
          />

          {/* Password input */}
          <FormInput
            inputId="password"
            inputType="password"
            placeholder="Meeting Password"
            labelText="Password"
            onChange={onPasswordChange}
            errorMessage={formErrors.password}
          />

          {/*Submit button*/}
          <button
            type="button"
            className="btn btn-primary btn-block mb-4 btn-login"
            onClick={onButtonClick}
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default JoinMeeting;
