import { IPastry, IPastryModel } from "../interfaces/pastries.interface";
import { RepositoryResponse } from "../interfaces/utils.interface";
import PastryModel from "../models/pastries.model";

class PastriesRepository {
  public static async getAllPastries(): Promise<RepositoryResponse<IPastry[]>> {
    const response = await PastryModel.find().exec();

    const pastries: IPastry[] = response.map((pastry) => pastry.toObject());

    return {
      data: pastries,
    };
  }

  public static async getRandomPastries(
    limit: number
  ): Promise<RepositoryResponse<IPastryModel[]>> {
    const pastries = await PastryModel.aggregate<IPastryModel>([
      { $match: { stock: { $gt: 0 } } },
      { $sample: { size: limit } },
    ]);

    return {
      data: pastries,
    };
  }
}

export default PastriesRepository;
