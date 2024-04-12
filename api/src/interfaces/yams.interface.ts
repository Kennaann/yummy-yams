import type { IPastry } from "./pastries.interface";

export type YamsResult = {
  combination: YamsCombinations;
  dices: number[];
};

export enum YamsCombinationsToPastriesCountMap {
  YAMS = 3,
  SQUARE = 2,
  DOUBLE = 1,
  NOTHING = 0,
}

export type YamsCombinations = keyof typeof YamsCombinationsToPastriesCountMap;

export interface IGetYamsResultsResponseDTO {
  code: number;
  message: string;
  data?: {
    result: YamsResult;
    pastries?: IPastry[];
  };
}
