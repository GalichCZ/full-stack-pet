import bcrypt from "bcrypt";
import uuid from "uuid";
import { getOneUser } from "../database/User";
import ApiError from "../exceptions/api.error";
import { TUserRegistration } from "../Types";

class UserService {
  async registration({
    email,
    nickname,
    password,
    avatar,
    birthday,
  }: TUserRegistration) {
    const candidate = await getOneUser({ email });

    if (candidate) {
      throw ApiError.BadRequest("User with this email address already exists");
    }

    const hashPassword = await bcrypt.hash(password, 3);
  }
}

export default new UserService();
