import { IPastryModel } from "../interfaces/pastries.interface";
import {
  YamsCombinations,
  YamsCombinationsToPastriesCountMap,
} from "../interfaces/yams.interface";
import PastryModel from "../models/pastries.model";
import PastriesRepository from "../repositories/pastries.repository";

class PastriesService {
  public static getSerializedPastries(pastryModels: IPastryModel[]) {
    return pastryModels.map(({ _id, name, image }) => ({
      _id,
      name,
      image,
    }));
  }

  public static async getWinnerPastriesFor(
    combination: YamsCombinations
  ): Promise<IPastryModel[]> {
    try {
      const pastriesResponse = await PastriesRepository.getRandomPastries(
        YamsCombinationsToPastriesCountMap[combination]
      );

      for (const pastry of pastriesResponse.data!) {
        pastry.stock -= 1;
        pastry.quantityWon += 1;

        await PastryModel.replaceOne({ _id: pastry._id }, { ...pastry }).exec();
      }

      return pastriesResponse.data!;
    } catch (error) {
      console.error("PastriesService.getWinnerPastriesFor: ", error);

      return [];
    }
  }
}

export default PastriesService;
