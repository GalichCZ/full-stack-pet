import { Schema, model } from "mongoose";
import { IPost } from "../Types";

const postSchema = new Schema<IPost>(
  {
    media: {
      type: String,
      required: true,
    },
    description: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IPost>("Post", postSchema);
