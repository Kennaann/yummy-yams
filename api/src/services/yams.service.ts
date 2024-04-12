import { IUser } from "../interfaces/user.interface";
import {
  type IGetYamsResultsResponseDTO,
  YamsCombinations,
  type YamsResult,
} from "../interfaces/yams.interface";
import UserRepository from "../repositories/user.repository";
import PastriesService from "./pastries.service";
import UserService from "./user.service";
import LeaderBoardService from "./leaderboard.service";

class YamsService {
  private static readonly DICE_FACES = 1;
  private static readonly DICE_COUNT = 5;

  public static async getYamsResults(
    userEmail: string
  ): Promise<IGetYamsResultsResponseDTO> {
    try {
      const userResponse = await UserRepository.findUserByEmail(userEmail);
      const isUserAuthorized = await this.isUserAuthorized(userResponse.data);
      if (!isUserAuthorized) {
        return {
          code: 403,
          message: "No attempts left",
        };
      }

      const result = this.getCombination(this.DICE_FACES, this.DICE_COUNT);

      return await this.handleGameResult(result, userResponse.data!);
    } catch (error) {
      console.error("YamsService.getYamsResults: ", error);

      return {
        code: 500,
        message: "Internal server error",
      };
    }
  }

  private static getCombination(faces: number, dicesCount: number): YamsResult {
    const combinations = Array.from({ length: faces }, () => 0);
    const dices: number[] = [];

    for (let i = 0; i < dicesCount; i++) {
      const randomNumber = Math.floor(Math.random() * faces);
      combinations[randomNumber]++;
      dices.push(randomNumber + 1);
    }
    const highestCombination = Math.max(...combinations);

    let result: YamsCombinations = "NOTHING";
    if (this.isDouble(combinations)) result = "DOUBLE";
    if (highestCombination > 3) result = "SQUARE";
    if (highestCombination > 4) result = "YAMS";

    return {
      combination: result,
      dices,
    };
  }

  private static isDouble(combinations: number[]): boolean {
    return combinations.filter((num) => num === 2).length > 1;
  }

  private static async handleGameResult(
    result: YamsResult,
    user: IUser
  ): Promise<IGetYamsResultsResponseDTO> {
    await UserService.handleUserAttempt(user);

    if (result.combination === "NOTHING") {
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
      return {
        code: 500,
        message: "No pastries left in stock",
      };
    }
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

  private static async isUserAuthorized(
    user: IUser | null | undefined
  ): Promise<boolean> {
    if (!user || user.attempts < 1) return false;

    return true;
  }
}

export default YamsService;
