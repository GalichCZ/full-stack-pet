export interface IUser {
  email: string;
  nickname: string;
  password: string;
  birthday: string;
  avatar?: string;
  banned: boolean;
  activated: boolean;
  role: string;
}
