import { IUser } from "../interfaces/user.interface";
import {
  GetYamsResultsResponseDTO,
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
  ): GetYamsResultsResponseDTO {
    const isGameOpenResponse = await LeaderBoardRepository.isLeaderboardOpen();

    if (!isGameOpenResponse.data) {
      return {
        code: 403,
        message: "CLOSED_GAME",
      };
    }

    const userResponse = await UserRepository.findUserByEmail(userEmail);
    if (!userResponse.data || userResponse.data.attempts >= this.MAX_ATTEMPTS) {
      return {
        code: 403,
        message: "NO_ATTEMPS_LEFT",
      };
    }

    const result = YamsService.getCombination(this.DICE_FACES, this.DICE_COUNT);

    return await this.handleGameResult(result, userResponse.data);
  }

  private static async handleGameResult(
    result: YamsResult,
    user: IUser
  ): GetYamsResultsResponseDTO {
    if (result.combination === "NOTHING") {
      await UserService.updateUserAttempts(user, 1);

      return {
        code: 200,
        message: "OK",
        data: {
          result,
          attempts: this.MAX_ATTEMPTS - (user.attempts + 1),
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
        attempts: 0,
      },
    };
  }
}

export default YamsController;
