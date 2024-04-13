import type { ILeaderBoardModel } from "../interfaces/leaderboard.interface";
import LeaderBoardRepository from "../repositories/leaderboard.repository";
import type { IPastryModel } from "../interfaces/pastries.interface";
import type { IUser } from "../interfaces/user.interface";

class LeaderBoardService {
  public static async updateLeaderBoard(user: IUser, pastries: IPastryModel[]) {
    const leaderboardEntry: ILeaderBoardModel["wins"] = {
      winner: user,
      prize: pastries,
    };

    return await LeaderBoardRepository.addEntry(leaderboardEntry);
  }

  public static async closeLeaderboard() {
    const currentLeaderboard =
      await LeaderBoardRepository.getCurrentLeaderboard();

    if (!currentLeaderboard) {
      return;
    }

    await LeaderBoardRepository.updateLeaderboard(currentLeaderboard._id, {
      isGameOpen: false,
    });
  }

  public static async isGameOpen() {
    const currentLeaderboard =
      await LeaderBoardRepository.getCurrentLeaderboard();

    if (!currentLeaderboard) {
      return true;
    }

    return currentLeaderboard.isGameOpen;
  }
}

export default LeaderBoardService;
