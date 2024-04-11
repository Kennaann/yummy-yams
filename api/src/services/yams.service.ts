import type { IPastry } from "../interfaces/pastries.interface";
import {
  type IGetYamsResultsResponseDTO,
  YamsResult,
} from "../interfaces/yams.interface";

class YamsService {
  public static async getYamsResults(): Promise<IGetYamsResultsResponseDTO> {
    const combination = this.getCombination(3);

    const response: IGetYamsResultsResponseDTO = {
      code: 200,
      message: "OK",
      data: {
        result: combination,
      },
    };
    if (combination !== YamsResult.NOTHING) {
      response.data.pastries = {} as IPastry[];
    }

    return response;
  }

  private static getCombination(faces: number): YamsResult {
    const combinations = Array.from({ length: 5 }, () => 0);

    for (let i = 0; i < combinations.length; i++) {
      const randomNumber = Math.floor(Math.random() * faces);

      combinations[randomNumber]++;
    }

    console.log(combinations);

    const highestCombination = Math.max(...combinations);

    if (highestCombination > 4) return YamsResult.YAMS;
    if (highestCombination > 3) return YamsResult.SQUARE;

    if (this.isDouble(combinations)) return YamsResult.DOUBLE;

    return YamsResult.NOTHING;
  }

  private static isDouble(combinations: number[]): boolean {
    let count = 0;

    for (let i = 0; i < combinations.length; i++) {
      if (combinations[i] === undefined) continue;

      for (let j = i + 1; j < combinations.length; j++) {
        if (combinations[i] === combinations[j]) {
          count++;

          delete combinations[i];
          delete combinations[j];

          break;
        }
      }
    }

    return count > 1;
  }
}

export default YamsService;
