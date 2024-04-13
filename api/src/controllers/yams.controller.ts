import { IUser } from "../interfaces/user.interface";
import {
  IGetYamsResultsResponseDTO,
  YamsResult,
} from "../interfaces/yams.interface";
import LeaderBoardRepository from "../repositories/leaderboard.repository";
import UserRepository from "../repositories/user.repository";
import LeaderBoardService from "../services/leaderboard.service";
import PastriesService from "../services/pastries.service";
import UserService from "../services/user.service";
import YamsService from "../services/yams.service";

class YamsController {
  private static readonly DICE_FACES = 4;
  private static readonly DICE_COUNT = 5;
  private static readonly MAX_ATTEMPTS = 3;

  public static async getYamsResults(
    userEmail: string
  ): Promise<IGetYamsResultsResponseDTO> {
    const isGameOpenResponse = await LeaderBoardRepository.isLeaderboardOpen();

    if (!isGameOpenResponse.data) {
      return {
        code: 403,
        message: "Game is closed",
      };
    }

    const userResponse = await UserRepository.findUserByEmail(userEmail);
    if (!userResponse.data || userResponse.data.attempts >= this.MAX_ATTEMPTS) {
      return {
        code: 403,
        message: "No attempts left",
      };
    }

    const result = YamsService.getCombination(this.DICE_FACES, this.DICE_COUNT);

    return await this.handleGameResult(result, userResponse.data!);
  }

  private static async handleGameResult(
    result: YamsResult,
    user: IUser
  ): Promise<IGetYamsResultsResponseDTO> {
    if (result.combination === "NOTHING") {
      await UserService.updateUserAttempts(user, 1);

      return {
        code: 200,
        message: "OK",
        data: {
          result,
        },
      };
    }

    const pastryModels = await PastriesService.getWinnerPastriesFor(
      result.combination
    );

    if (pastryModels.length < 1) {
      LeaderBoardService.closeLeaderboard();

      return {
        code: 500,
        message: "No pastries left in stock",
      };
    }

    await UserService.updateUserAttempts(user, this.MAX_ATTEMPTS);
    await LeaderBoardService.updateLeaderBoard(user, pastryModels);

    const pastries = PastriesService.getSerializedPastries(pastryModels);

    return {
      code: 200,
      message: "OK",
      data: {
        result,
        pastries,
      },
    };
  }
}

export default YamsController;
