import { Types } from "mongoose";
import { ILeaderBoardModel } from "../interfaces/leaderboard.interface";
import LeaderBoardRepository from "../repositories/leaderboard.repository";
import { IPastryModel } from "../interfaces/pastries.interface";
import { IUser } from "../interfaces/user.interface";

class LeaderBoardService {
  public static async updateLeaderBoard(user: IUser, pastries: IPastryModel[]) {
    const leaderboardEntry: ILeaderBoardModel["wins"] = {
      winner: user,
      prize: pastries,
    };

    return await LeaderBoardRepository.addEntry(leaderboardEntry);
  }
}

export default LeaderBoardService;
