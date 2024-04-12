import type { IPastry } from "../interfaces/pastries.interface";
import {
  type IGetYamsResultsResponseDTO,
  YamsCombinations,
  type YamsResult,
} from "../interfaces/yams.interface";

class YamsService {
  private static readonly DICE_FACES = 6;
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
    if (result.combination !== YamsCombinations.NOTHING) {
      response.data.pastries = {} as IPastry[];
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

    let result = YamsCombinations.NOTHING;

    if (highestCombination > 4) result = YamsCombinations.YAMS;
    if (highestCombination > 3) result = YamsCombinations.SQUARE;
    if (this.isDouble(combinations)) result = YamsCombinations.DOUBLE;

    return {
      combination: result,
      dices,
    };
  }

  private static isDouble(combinations: number[]): boolean {
    return combinations.filter((num) => num === 2).length > 1;
  }
}

export default YamsService;
