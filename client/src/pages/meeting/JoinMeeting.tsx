import React, { ChangeEvent, useState } from "react";
import FormInput from "../../components/FormInput";
import "./joinMeeting.css";

const JoinMeeting = () => {
  const [meetingId, setMeetingId] = useState("");
  const [password, setPassword] = useState("");

  const onMeetingIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeetingId(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onButtonClick = () => {
    console.log("clicked");
    window.open(`/meeting?mid=${meetingId}&pwd=${password}`);
    window.location.reload();
  };

  return (
    <>
      <div className="form-login">
        <h2>Login Form</h2>
        <form>
          {/* Meeting Id input */}
          <FormInput
            inputId="email"
            inputType="email"
            placeholder="Your Email"
            labelText="Email Address"
            onChange={onMeetingIdChange}
            errorMessage=""
          />

          {/* Password input */}
          <FormInput
            inputId="password"
            inputType="password"
            placeholder="Your Password"
            labelText="Password"
            onChange={onPasswordChange}
            errorMessage=""
          />

          <div className="col mb-2 text-right">
            <a className="custom-link" href="#!">
              Forgot password?
            </a>
          </div>

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
