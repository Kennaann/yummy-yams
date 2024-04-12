import { IPastry } from "../interfaces/pastries.interface";
import {
  type IGetYamsResultsResponseDTO,
  YamsCombinations,
  type YamsResult,
  YamsCombinationsToPastriesCountMap,
} from "../interfaces/yams.interface";
import PastriesService from "./pastries.service";
import UserService from "./user.service";

class YamsService {
  private static readonly DICE_FACES = 1;
  private static readonly DICE_COUNT = 5;

  public static async getYamsResults(
    userId: string
  ): Promise<IGetYamsResultsResponseDTO> {
    const isUserAuthorized = await this.isUserAuthorized(userId);
    if (!isUserAuthorized) {
      return {
        code: 403,
        message: "Max attempts reached.",
      };
    }

    const result = this.getCombination(this.DICE_FACES, this.DICE_COUNT);

    return await this.handleGameResult(result, userId);
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
    userId: string
  ): Promise<IGetYamsResultsResponseDTO> {
    if (result.combination === "NOTHING") {
      await UserService.updateUser(userId, null);

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

    if (
      pastryModels.length <
      YamsCombinationsToPastriesCountMap[result.combination]
    ) {
      return {
        code: 500,
        message: "No pastries left in stock",
      };
    }
    await UserService.updateUser(userId, pastryModels);

    const pastries: IPastry[] = pastryModels.map(({ _id, name, image }) => {
      return {
        id: _id,
        name,
        image,
      };
    });

    return {
      code: 200,
      message: "OK",
      data: {
        result,
        pastries,
      },
    };
  }

  private static async isUserAuthorized(userId: string): Promise<boolean> {
    const user = await UserService.findUserByEmail(userId);

    if (!user || user?.toObject().attempts < 1) return false;

    return true;
  }
}

export default YamsService;
