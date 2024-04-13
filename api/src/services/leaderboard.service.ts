import type {
  GetLeaderBoardWinsResponseDTO,
  ILeaderBoardWin,
} from "../interfaces/leaderboard.interface";
import LeaderBoardRepository from "../repositories/leaderboard.repository";
import type { IPastryModel } from "../interfaces/pastries.interface";
import type { IUser } from "../interfaces/user.interface";
import { ApiResponseDTO } from "../interfaces/utils.interface";

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

  public static async isGameOpen(): Promise<ApiResponseDTO<boolean>> {
    const response = await LeaderBoardRepository.isLeaderboardOpen();

    return {
      code: 200,
      message: "OK",
      data: response.data,
    };
  }

  public static async getCurrentLeaderboardWins(): Promise<GetLeaderBoardWinsResponseDTO> {
    const currentLeaderboardResponse =
      await LeaderBoardRepository.getCurrentLeaderboard();

    if (!currentLeaderboardResponse.data) {
      return {
        code: 404,
        message: "No leaderboard found",
      };
    }

    return {
      code: 200,
      message: "OK",
      data: currentLeaderboardResponse.data.wins,
    };
  }
}

export default LeaderBoardService;
