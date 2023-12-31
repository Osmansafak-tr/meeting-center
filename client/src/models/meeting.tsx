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

export type { Meeting };
