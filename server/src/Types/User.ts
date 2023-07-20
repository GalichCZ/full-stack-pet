import { Types } from "mongoose";

export interface IUser {
  id: Types.ObjectId;
  email: string;
  nickname: string;
  password: string;
  birthday: Date;
  avatar?: string;
  banned: boolean;
  activated: boolean;
  role: string;
}

export type TUserDTO = Omit<IUser, "password">;
