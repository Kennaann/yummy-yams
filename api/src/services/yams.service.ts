import { IPastry } from "../interfaces/pastries.interface";
import { IUser } from "../interfaces/user.interface";
import {
  type IGetYamsResultsResponseDTO,
  YamsCombinations,
  type YamsResult,
} from "../interfaces/yams.interface";
import UserRepository from "../repositories/user.repository";
import PastriesService from "./pastries.service";
import UserService from "./user.service";

class YamsService {
  private static readonly DICE_FACES = 1;
  private static readonly DICE_COUNT = 5;

  public static async getYamsResults(
    userEmail: string
  ): Promise<IGetYamsResultsResponseDTO> {
    const user = await UserRepository.findUserByEmail(userEmail);
    const isUserAuthorized = await this.isUserAuthorized(user?.toObject());
    if (!isUserAuthorized) {
      return {
        code: 403,
        message: "No attempts left",
      };
    }

    const result = this.getCombination(this.DICE_FACES, this.DICE_COUNT);

    return await this.handleGameResult(result, user!.toObject());
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
    if (result.combination === "NOTHING") {
      await UserService.handleUserAttempt(user, null);

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
    await UserService.handleUserAttempt(user, pastryModels);

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

  private static async isUserAuthorized(
    user: IUser | undefined
  ): Promise<boolean> {
    if (!user || user.attempts < 1) return false;

    return true;
  }
}

export default YamsService;
