import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import ApiError from "../exceptions/api.error";
import { TUserDTO } from "../Types";
import { saveToken } from "../database/Token";

class TokenService {
  generateTokens(payload: TUserDTO) {
    if (process.env.JWT_ACCESS_SECRET) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15s",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30s",
      });

      return { accessToken, refreshToken };
    } else {
      throw ApiError.UnauthorizedError();
    }
  }

  validateAccessToken() {}

  validateRefreshToken() {}

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const token = await saveToken(userId, refreshToken);
    return token;
  }

  async findToken() {}

  async deleteToken() {}
}

export default new TokenService();
