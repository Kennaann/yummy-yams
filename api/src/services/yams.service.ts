import {
  YamsCombinations,
  type YamsResult,
} from "../interfaces/yams.interface";

class YamsService {
  public static getCombination(faces: number, dicesCount: number): YamsResult {
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
}

export default YamsService;
