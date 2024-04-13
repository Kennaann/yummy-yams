import { Types } from "mongoose";
import {
  ILeaderBoardModel,
  ILeaderBoardWin,
} from "../interfaces/leaderboard.interface";
import LeaderBoardModel from "../models/leaderboard.model";
import { RepositoryResponse } from "../interfaces/utils.interface";

class LeaderBoardRepository {
  public static async addEntry(
    leaderboardEntry: ILeaderBoardWin
  ): Promise<void> {
    await LeaderBoardModel.findOneAndUpdate(
      {},
      { $push: { wins: leaderboardEntry }, $set: { updatedAt: Date.now() } },
      { upsert: true }
    );
  }

  public static async getCurrentLeaderboard(): Promise<
    RepositoryResponse<ILeaderBoardModel | null>
  > {
    const response = await LeaderBoardModel.findOne().sort({ createdAt: 1 });

    return {
      data: response?.toObject() ?? null,
    };
  }

  public static async updateLeaderboard(
    id: Types.ObjectId,
    data: Partial<ILeaderBoardModel>
  ): Promise<void> {
    await LeaderBoardModel.findOneAndUpdate(
      { _id: id },
      { ...data, updatedAt: Date.now() }
    );
  }
}

export default LeaderBoardRepository;
