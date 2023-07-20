import { Types } from "mongoose";

export interface IPost {
  media: string;
  description: string;
  creator: Types.ObjectId;
}
