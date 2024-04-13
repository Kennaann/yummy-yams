import LeaderBoardRepository from "../repositories/leaderboard.repository";
import { ApiResponseDTO } from "../interfaces/utils.interface";
import { GetLeaderBoardWinsResponseDTO } from "../interfaces/leaderboard.interface";

class LeaderBoardController {
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

export default LeaderBoardController;
