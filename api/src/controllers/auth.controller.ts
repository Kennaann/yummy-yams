import type {
  IRegisterUserDTO,
  ILoginUserDTO,
  TRegisterUserResponseDTO,
  TLoginUserResponseDTO,
} from "../interfaces/auth.interface";
import AuthService from "../services/auth.service";

class AuthController {
  public static async registerUser(
    user: IRegisterUserDTO
  ): Promise<TRegisterUserResponseDTO> {
    return await AuthService.registerUser(user);
  }

  public static async loginUser(
    user: ILoginUserDTO
  ): Promise<TLoginUserResponseDTO> {
    return await AuthService.loginUser(user);
  }
}

export default AuthController;
