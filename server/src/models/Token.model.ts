import { model, Schema } from "mongoose";
import { IToken } from "../Types";

const tokenSchema = new Schema<IToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IToken>("Token", tokenSchema);
