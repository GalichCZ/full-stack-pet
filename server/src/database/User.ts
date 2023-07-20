import UserDTO from "../dto/User.dto";
import UserSchema from "../models/User.model";
import { TUserDTO } from "../Types";

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

export const getOneUser = async (_id: string) => {
  try {
    const user = await UserSchema.findById(_id).exec();

    if (!user) {
      return { message: "Cannot find user" };
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
    return error;
  }
};
