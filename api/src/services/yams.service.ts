import { IPastry } from "../interfaces/pastries.interface";
import {
  type IGetYamsResultsResponseDTO,
  YamsCombinations,
  type YamsResult,
} from "../interfaces/yams.interface";
import PastriesService from "./pastries.service";
import UserService from "./user.service";

class YamsService {
  private static readonly DICE_FACES = 1;
  private static readonly DICE_COUNT = 5;

  public static async getYamsResults(): Promise<IGetYamsResultsResponseDTO> {
    const result = this.getCombination(this.DICE_FACES, this.DICE_COUNT);

    const response: IGetYamsResultsResponseDTO = {
      code: 200,
      message: "OK",
      data: {
        result,
      },
    };

    if (result.combination !== "NOTHING") {
      response.data.pastries = await this.handleWinningGame(result.combination);
    }

    return response;
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

  private static async handleWinningGame(
    combination: YamsCombinations
  ): Promise<IPastry[]> {
    const pastryModels = await PastriesService.getWinnerPastriesFor(
      combination
    );

    await UserService.updateUser("mail@mail.com", pastryModels); // TODO: get user email from token

    const pastries: IPastry[] = pastryModels.map(({ _id, name, image }) => {
      return {
        id: _id,
        name,
        image,
      };
    });
    return pastries;
  }
}

export default YamsService;
