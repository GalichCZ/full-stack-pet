import { Types } from "mongoose";
import { TUserDTO } from "../Types";

class UserDTO implements TUserDTO {
  public id: Types.ObjectId;
  public email: string;
  public nickname: string;
  public birthday: Date;
  public banned: boolean;
  public activated: boolean;
  public role: string;
  public avatar: string | undefined;
  constructor(
    id: Types.ObjectId,
    email: string,
    nickname: string,
    birthday: Date,
    banned: boolean,
    activated: boolean,
    role: string,
    avatar: string | undefined
  ) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.birthday = birthday;
    this.banned = banned;
    this.activated = activated;
    this.role = role;
    this.avatar = avatar;
  }
}

export default UserDTO;
