import {
  type IGetAllPastriesResponseDTO,
  type IPastry,
} from "../interfaces/pastries.interface";
import {
  YamsCombinations,
  YamsCombinationsToPastriesCountMap,
} from "../interfaces/yams.interface";
import PastryModel from "../models/pastries.model";

class PastriesService {
  public static async getAllPastries(): Promise<IGetAllPastriesResponseDTO> {
    const response = await PastryModel.find().exec();

    const pastries: Partial<IPastry>[] = response.map((pastry) => {
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
  ): Promise<IPastry[]> {
    try {
      const pastries = await PastryModel.aggregate<IPastry>([
        { $match: { stock: { $gt: 0 } } },
        { $sample: { size: YamsCombinationsToPastriesCountMap[combination] } },
      ]);

      for (const pastry of pastries) {
        await PastryModel.updateOne(
          { _id: pastry._id },
          { $inc: { quantityWon: 1, stock: -1 } }
        ).exec();
      }

      return pastries;
    } catch (error) {
      console.error("PastriesService.getWinnerPastriesFor: ", error);

      return [];
    }
  }
}

export default PastriesService;
