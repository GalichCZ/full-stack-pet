import { Types } from "mongoose";
import TokenSchema from "../models/Token.model";

export const saveToken = async (
  userId: Types.ObjectId,
  refreshToken: string
) => {
  try {
    const tokenData = await TokenSchema.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
    }

    const token = TokenSchema.create({ user: userId, refreshToken });
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteToken = async (refreshToken: string) => {
  try {
    const token = await TokenSchema.deleteOne({ refreshToken });
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findToken = async (refreshToken: string) => {
  try {
    const token = await TokenSchema.findOne({ refreshToken });
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};
