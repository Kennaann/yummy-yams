import type {
  IRegisterUserDTO,
  IRegisterUserResponseDTO,
} from "../interfaces/user.interface";
import UserService from "../services/user.service";

class UserController {
  public static async registerUser(
    user: IRegisterUserDTO
  ): Promise<IRegisterUserResponseDTO> {
    const userService = new UserService();
    const response = await userService.registerUser(user);

    return response;
  }
}

export default UserController;
