import { Types } from "mongoose";

export interface IPastry {
  id: Types.ObjectId;
  name: string;
  image: string;
  stock: number;
  quantityWon: number;
}

export interface IGetAllPastriesResponseDTO {
  code: number;
  message: string;
  data: Partial<IPastry>[];
}
