import PastriesService from "../services/pastries.service";

class PastriesController {
  public static async getAllPastries() {
    return await PastriesService.getAllPastries();
  }
}

export default PastriesController;
