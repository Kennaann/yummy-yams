import { Types } from "mongoose";
import { IPastry } from "./pastries.interface";
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
  winner: Pick<IUser, "username" | "email">;
  prize: IPastry[];
  createdAt?: Date;
}

export type GetLeaderBoardWinsResponseDTO = ApiResponseDTO<ILeaderBoardWin[]>;
export type IsLeaderBoardOpenResponseDTO = ApiResponseDTO<boolean>;
