import bcrypt from "bcrypt";
import { getOneUser, createUser, passwordCompare } from "../database/User";
import ApiError from "../exceptions/api.error";
import { TUserRegistration } from "../Types";
import TokenService from "./Token.service";

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

    const user = await createUser({
      email,
      nickname,
      avatar,
      birthday,
      password: hashPassword,
    });

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const tokens = TokenService.generateTokens({ ...user });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async login(nickname: string, password: string) {
    const user = await getOneUser({ nickname });
    if (!user) {
      throw ApiError.BadRequest("Wrong nickname or password");
    }

    const isPassEqual = await passwordCompare(nickname, password);

    if (!isPassEqual) {
      throw ApiError.BadRequest("Wrong nickname or password");
    }

    const tokens = TokenService.generateTokens({ ...user });

    await TokenService.saveToken(user._id, tokens.refreshToken);
    return { ...tokens, user };
  }
}

export default new UserService();
