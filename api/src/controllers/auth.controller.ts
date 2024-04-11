import type {
  IRegisterUserDTO,
  IRegisterUserResponseDTO,
} from "../interfaces/user.interface";
import AuthService from "../services/auth.service";

class AuthController {
  public static async registerUser(
    user: IRegisterUserDTO
  ): Promise<IRegisterUserResponseDTO> {
    const response = await AuthService.registerUser(user);

    return response;
  }
}

export default AuthController;
