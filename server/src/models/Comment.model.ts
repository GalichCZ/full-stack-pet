import { Schema, model } from "mongoose";
import { IComment } from "../Types";

const commentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

export default model<IComment>("Comment", commentSchema);
