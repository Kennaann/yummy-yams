import { IUserTokenData } from "../interfaces/user.interface";
import type { IGetYamsResultsResponseDTO } from "../interfaces/yams.interface";
import YamsService from "../services/yams.service";

class YamsController {
  public static async getYamsResults(
    userId: string
  ): Promise<IGetYamsResultsResponseDTO> {
    return await YamsService.getYamsResults(userId);
  }
}

export default YamsController;
