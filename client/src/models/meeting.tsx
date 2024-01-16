type Meeting = {
  _id: string;
  meetingId: string;
  userId: string;
  password: string;
  topic: string;
  plannedStartTime: Date;
  isStarted: boolean;
  isActive: boolean;
  startTime: Date;
  endTime: Date;
  participants: {
    name: String;
    agoraId: Number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

type MeetingDetail = {
  _id: string;
  meetingId: string;
  password: string;
  topic: string;
  plannedStartTime: Date;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  isStarted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type { Meeting, MeetingDetail };
