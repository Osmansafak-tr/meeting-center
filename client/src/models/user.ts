type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  screenName: string;
  name: string;
  surname: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserUpdateModel = {
  _id: string;
  screenName: string;
  name: string;
  surname: string;
};

export type { User, UserUpdateModel };
