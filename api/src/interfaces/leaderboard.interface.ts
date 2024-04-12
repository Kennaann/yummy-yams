import { Types } from "mongoose";
import { IPastryModel } from "./pastries.interface";
import { IUser } from "./user.interface";

export interface ILeaderBoardModel {
  _id?: Types.ObjectId;
  isGameOpen?: boolean;
  wins: {
    winner: Partial<IUser>;
    prize: Partial<IPastryModel>[];
    createdAt?: Date;
  };
}
