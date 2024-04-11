import type {
  ICreateUserDTO,
  ICreateUserResponseDTO,
} from "../interfaces/user.interface";
import UserService from "../services/user.service";

class UserController {
  public static async createUser(
    user: ICreateUserDTO
  ): Promise<ICreateUserResponseDTO> {
    const userService = new UserService();
    const response = await userService.createUser(user);

    return response;
  }
}

export default UserController;
