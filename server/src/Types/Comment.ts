import { Types } from "mongoose";

export interface IComment {
  text: string;
  post: Types.ObjectId;
}
