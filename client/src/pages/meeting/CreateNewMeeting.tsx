import { ChangeEvent, useState } from "react";
import FormInput from "../../components/FormInput";
import "./CreateNewMeeting.css";
import { backendReqHandler } from "../../services/reqHandler";
import { useNavigate } from "react-router-dom";

const CreateNewMeeting = () => {
  const [topic, setTopic] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [plannedStartTime, setPlannedStartTime] = useState<string>();
  const navigate = useNavigate();

  const onTopicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onPlannedStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlannedStartTime(event.target.value);
  };

  const onButtonClick = async () => {
    let date = new Date();
    if (plannedStartTime) {
      date = new Date(plannedStartTime);
      const url = "/meetings";
      const body = {
        topic: topic,
        password: password,
        plannedStartTime: plannedStartTime,
      };
      await backendReqHandler.post(url, body);
      navigate("/myMeetings");
    }
  };

  return (
    <>
      <div className="form-new-meeting">
        <h2>Create New Meeting</h2>
        <div>
          <FormInput
            inputId="topic"
            inputType="text"
            placeholder="Meeting Topic"
            labelText="Meeting Topic"
            onChange={onTopicChange}
            errorMessage=""
          />
          <FormInput
            inputId="password"
            inputType="password"
            placeholder="Meeting Password"
            labelText="Meeting Password"
            onChange={onPasswordChange}
            errorMessage=""
          />
          <FormInput
            inputId="plannedStartTime"
            inputType="datetime-local"
            placeholder=""
            labelText="Planned Start Time"
            onChange={onPlannedStartTimeChange}
            errorMessage=""
          />

          <button
            className="btn btn-primary btn-create btn-block"
            onClick={onButtonClick}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateNewMeeting;
