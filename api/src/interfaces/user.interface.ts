import { Model, Types } from "mongoose";
import type { IPastryModel } from "./pastries.interface";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: TUserRoles;
  createdAt: Date;
  updatedAt: Date;
  attempts: number;
  prize: {
    pastries: Partial<IPastryModel>[];
    createdAt: Date;
  };
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
