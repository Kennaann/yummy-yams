import { Types } from "mongoose";
import { IPastryModel } from "./pastries.interface";
import { IUser } from "./user.interface";
import { ApiResponseDTO } from "./utils.interface";

export interface ILeaderBoardModel {
  _id: Types.ObjectId;
  isGameOpen?: boolean;
  wins: ILeaderBoardWin[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILeaderBoardWin {
  winner: Partial<IUser>;
  prize: Partial<IPastryModel>[];
  createdAt?: Date;
}

export type GetLeaderBoardWinsResponseDTO = ApiResponseDTO<ILeaderBoardWin[]>;
