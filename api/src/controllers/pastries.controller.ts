import { IGetAllPastriesResponseDTO } from "../interfaces/pastries.interface";
import PastriesRepository from "../repositories/pastries.repository";

class PastriesController {
  public static async getAllPastries(): IGetAllPastriesResponseDTO {
    const response = await PastriesRepository.getAllPastries();

    return {
      code: 200,
      message: "Ok",
      data: response.data,
    };
  }
}

export default PastriesController;
