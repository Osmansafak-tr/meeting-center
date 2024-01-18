import { ChangeEvent, useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { backendReqHandler } from "../../services/reqHandler";
import { useNavigate, useParams } from "react-router-dom";
import { MeetingUpdate } from "../../models/meeting";
import coreFunctions from "../../core/functions";

const EditMyMeeting = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState("");
  const [plannedStartTime, setPlannedStartTime] = useState<Date>();
  const navigate = useNavigate();

  useEffect(() => {
    const getMeeting = async () => {
      const url = `/meetings/${id}`;
      const response = await backendReqHandler.get(url);
      const meeting: MeetingUpdate = response.data;
      console.log(meeting);
      setTopic(meeting.topic);
      setPlannedStartTime(meeting.plannedStartTime);
      const topicInput: any = document.getElementById("topic");
      if (topicInput) topicInput.value = meeting.topic ?? "";
      const plannedStartTimeInput: any =
        document.getElementById("plannedStartTime");
      if (plannedStartTimeInput)
        plannedStartTimeInput.value =
          coreFunctions.formatDate(meeting.plannedStartTime, "htmlDate") ?? "";
    };
    getMeeting();
  }, []);

  const onTopicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };
  const onPlannedStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlannedStartTime(new Date(event.target.value));
  };
  const onButtonClick = async () => {
    const url = `/meetings/${id}`;
    const body = {
      topic: topic,
      plannedStartTime: plannedStartTime,
    };
    await backendReqHandler.put(url, body);
    navigate("/myMeetings");
  };
  return (
    <div className="form-new-meeting">
      <h2>Edit Meeting Form</h2>
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
          Update
        </button>
      </div>
    </div>
  );
};

export default EditMyMeeting;
