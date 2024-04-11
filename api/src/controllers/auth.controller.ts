import type {
  IRegisterUserDTO,
  IAuthUserResponseDTO,
  ILoginUserDTO,
} from "../interfaces/user.interface";
import AuthService from "../services/auth.service";

class AuthController {
  public static async registerUser(
    user: IRegisterUserDTO
  ): Promise<IAuthUserResponseDTO<IRegisterUserDTO>> {
    return await AuthService.registerUser(user);
  }

  public static async loginUser(
    user: ILoginUserDTO
  ): Promise<IAuthUserResponseDTO<ILoginUserDTO>> {
    return await AuthService.loginUser(user);
  }
}

export default AuthController;
