import type { IPastry } from "./pastries.interface";
import { ApiResponseDTO } from "./utils.interface";

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

export interface YamsResults {
  result: YamsResult;
  pastries?: IPastry[];
  attempts: number;
}

export type GetYamsResultsResponseDTO = ApiResponseDTO<YamsResults>;
