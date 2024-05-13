import { Types } from "mongoose";
import { ApiResponseDTO } from "./utils.interface";

export interface IPastryModel {
  _id: Types.ObjectId;
  name: string;
  image: string;
  stock: number;
  quantityWon: number;
}

export interface IPastry {
  _id: Types.ObjectId;
  name: string;
  image: string;
}

export type IGetAllPastriesResponseDTO = ApiResponseDTO<IPastry[]>;
