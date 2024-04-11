import type { IPastry } from "./pastries.interface";

export enum YamsResult {
  YAMS = "YAMS",
  SQUARE = "SQUARE",
  DOUBLE = "DOUBLE",
  NOTHING = "NOTHING",
}

export interface IGetYamsResultsResponseDTO {
  code: number;
  message: string;
  data: {
    result: keyof typeof YamsResult;
    pastries?: IPastry[];
  };
}
