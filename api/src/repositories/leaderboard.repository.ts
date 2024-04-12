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
}

export default LeaderBoardRepository;
