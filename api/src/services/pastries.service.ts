import {
  IPastryModel,
  type IGetAllPastriesResponseDTO,
} from "../interfaces/pastries.interface";
import {
  YamsCombinations,
  YamsCombinationsToPastriesCountMap,
} from "../interfaces/yams.interface";
import PastryModel from "../models/pastries.model";

class PastriesService {
  public static async getAllPastries(): Promise<IGetAllPastriesResponseDTO> {
    const response = await PastryModel.find().exec();

    const pastries: Partial<IPastryModel>[] = response.map((pastry) => {
      const { _id, name, image } = pastry.toObject();
      return {
        id: _id,
        name,
        image,
      };
    });

    return {
      code: 200,
      message: "Ok",
      data: pastries,
    };
  }

  public static async getWinnerPastriesFor(
    combination: YamsCombinations
  ): Promise<IPastryModel[]> {
    try {
      const pastries = await PastryModel.aggregate<IPastryModel>([
        { $match: { stock: { $gt: 0 } } },
        { $sample: { size: YamsCombinationsToPastriesCountMap[combination] } },
      ]);

      for (const pastry of pastries) {
        pastry.stock -= 1;
        pastry.quantityWon += 1;

        await PastryModel.replaceOne({ _id: pastry._id }, { ...pastry }).exec();
      }

      return pastries;
    } catch (error) {
      console.error("PastriesService.getWinnerPastriesFor: ", error);

      return [];
    }
  }
}

export default PastriesService;
