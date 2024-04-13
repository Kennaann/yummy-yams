import type { ILeaderBoardWin } from "../interfaces/leaderboard.interface";
import LeaderBoardRepository from "../repositories/leaderboard.repository";
import type { IPastryModel } from "../interfaces/pastries.interface";
import type { IUser } from "../interfaces/user.interface";

class LeaderBoardService {
  public static async updateLeaderBoard(user: IUser, pastries: IPastryModel[]) {
    const leaderboardEntry: ILeaderBoardWin = {
      winner: user,
      prize: pastries,
    };

    return await LeaderBoardRepository.addEntry(leaderboardEntry);
  }

  public static async closeLeaderboard() {
    const currentLeaderboardResponse =
      await LeaderBoardRepository.getCurrentLeaderboard();

    if (!currentLeaderboardResponse.data) {
      return;
    }

    await LeaderBoardRepository.updateLeaderboard(
      currentLeaderboardResponse.data._id,
      { isGameOpen: false }
    );
  }
}

export default LeaderBoardService;
