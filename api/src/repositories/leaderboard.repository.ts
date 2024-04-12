import { Types } from "mongoose";
import { ILeaderBoardModel } from "../interfaces/leaderboard.interface";
import LeaderBoardModel from "../models/leaderboard.model";

class LeaderBoardRepository {
  public static async addEntry(leaderboardEntry: ILeaderBoardModel["wins"]) {
    return await LeaderBoardModel.findOneAndUpdate(
      {},
      { $push: { wins: leaderboardEntry } },
      { upsert: true }
    );
  }

  public static async getCurrentLeaderboard() {
    return await LeaderBoardModel.findOne().sort({ createdAt: 1 });
  }

  public static async updateLeaderboard(
    id: Types.ObjectId,
    data: Partial<ILeaderBoardModel>
  ) {
    return await LeaderBoardModel.findOneAndUpdate({ _id: id }, { ...data });
  }
}

export default LeaderBoardRepository;
