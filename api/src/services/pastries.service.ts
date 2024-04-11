import type {
  IGetAllPastriesResponseDTO,
  IPastry,
} from "../interfaces/pastries.interface";
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
}

export default PastriesService;
