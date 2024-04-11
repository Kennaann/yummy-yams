import type { IGetYamsResultsResponseDTO } from "../interfaces/yams.interface";
import YamsService from "../services/yams.service";

class YamsController {
  public static async getYamsResults(): Promise<IGetYamsResultsResponseDTO> {
    return await YamsService.getYamsResults();
  }
}

export default YamsController;
