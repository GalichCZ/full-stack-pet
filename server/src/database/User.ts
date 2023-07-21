import UserDTO from "../dto/User.dto";
import UserSchema from "../models/User.model";
import bcrypt from "bcrypt";
import { IUser, TUserDTO, TUserRegistration } from "../Types";

export const getAllUsers = async () => {
  try {
    const users = await UserSchema.find().exec();

    if (!users) {
      return { message: "There is no users" };
    }

    const usersDto: TUserDTO[] = users.map((user) => {
      const {
        _id,
        email,
        nickname,
        birthday,
        avatar,
        activated,
        banned,
        role,
      } = user;

      return new UserDTO(
        _id,
        email,
        nickname,
        birthday,
        banned,
        activated,
        role,
        avatar
      );
    });

    return usersDto;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOneUser = async <T extends object>(specifics: T) => {
  try {
    const query = { ...specifics };
    const user: IUser | null = await UserSchema.findOne(query).exec();

    if (!user) {
      return null;
    }

    const userDto: TUserDTO = new UserDTO(
      user._id,
      user.email,
      user.nickname,
      user.birthday,
      user.banned,
      user.activated,
      user.role,
      user.avatar
    );

    return userDto;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (userData: TUserRegistration) => {
  try {
    const newUser = await UserSchema.create({ ...userData });

    return new UserDTO(
      newUser._id,
      newUser.email,
      newUser.nickname,
      newUser.birthday,
      newUser.banned,
      newUser.activated,
      newUser.role,
      newUser.avatar
    );
  } catch (error) {
    console.log(error);
  }
};

export const passwordCompare = async (nickname: string, password: string) => {
  const user: IUser | null = await UserSchema.findOne({ nickname }).exec();

  if (!user) {
    return false;
  }

  const isPassEqual = await bcrypt.compare(password, user.password);

  return isPassEqual;
};
