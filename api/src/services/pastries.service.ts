import {
  IPastryModel,
  type IGetAllPastriesResponseDTO,
} from "../interfaces/pastries.interface";
import {
  YamsCombinations,
  YamsCombinationsToPastriesCountMap,
} from "../interfaces/yams.interface";
import PastryModel from "../models/pastries.model";
import PastriesRepository from "../repositories/pastries.repository";

class PastriesService {
  public static async getAllPastries(): Promise<IGetAllPastriesResponseDTO> {
    try {
      const response = await PastriesRepository.getAllPastries();

      return {
        code: 200,
        message: "Ok",
        data: response.data!,
      };
    } catch (error) {
      return {
        code: 500,
        message: "Internal server error",
      };
    }
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

  public static getSerializedPastries(pastryModels: IPastryModel[]) {
    return pastryModels.map(({ _id, name, image }) => ({
      id: _id,
      name,
      image,
    }));
  }
}

export default PastriesService;
