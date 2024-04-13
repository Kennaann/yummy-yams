import type {
  GetLeaderBoardWinsResponseDTO,
  ILeaderBoardWin,
} from "../interfaces/leaderboard.interface";
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

  public static async isGameOpen() {
    const currentLeaderboardResponse =
      await LeaderBoardRepository.getCurrentLeaderboard();

    if (!currentLeaderboardResponse.data) {
      return true;
    }

    return currentLeaderboardResponse.data.isGameOpen;
  }

  public static async getCurrentLeaderboardWins(): Promise<GetLeaderBoardWinsResponseDTO> {
    try {
      const currentLeaderboardResponse =
        await LeaderBoardRepository.getCurrentLeaderboard();

      if (!currentLeaderboardResponse.data) {
        return {
          code: 404,
          message: "No leaderboard found",
        };
      }

      console.log(currentLeaderboardResponse.data);

      return {
        code: 200,
        message: "OK",
        data: currentLeaderboardResponse.data.wins,
      };
    } catch (error) {
      console.error("LeaderBoardService.getCurrentLeaderboardWins: ", error);

      return {
        code: 500,
        message: "Internal server error",
      };
    }
  }
}

export default LeaderBoardService;
