import type { IPastry } from "./pastries.interface";

export type YamsResult = {
  combination: YamsCombinations;
  dices: number[];
};

export enum YamsCombinations {
  YAMS = "YAMS",
  SQUARE = "SQUARE",
  DOUBLE = "DOUBLE",
  NOTHING = "NOTHING",
}

export interface IGetYamsResultsResponseDTO {
  code: number;
  message: string;
  data: {
    result: YamsResult;
    pastries?: IPastry[];
  };
}
