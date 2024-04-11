import { Model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: TUserRoles;
  createdAt: Date;
  updatedAt: Date;
  attempts: number;
  methods: IUserMethods;
}

export type TUserRoles = "user" | "admin";

export interface IUserMethods {
  isValidPassword(password: string): Promise<boolean>;
}

export type TUserModel = Model<IUser, {}, IUserMethods>;

export interface ICreateUserModel {
  email: string;
  password: string;
  username: string;
}

export interface IUserTokenData {
  email: string;
  role: TUserRoles;
}
