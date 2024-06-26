import {
  AuthUserResponseDTO,
  ILoginUserDTO,
  IRegisterUserDTO,
} from "../interfaces/auth.interface";
import UserRepository from "../repositories/user.repository";
import AuthService from "../services/auth.service";

class AuthController {
  public static async registerUser(
    data: IRegisterUserDTO
  ): AuthUserResponseDTO<IRegisterUserDTO> {
    const response = await UserRepository.createUser(data);

    if (response.errors) {
      return {
        code: 400,
        message: "VALIDATION_ERRORS",
        errors: response.errors,
      };
    }

    const { email, username, role } = response.data;
    const token = AuthService.generateAccessToken({ email, role });

    return {
      code: 201,
      message: "User created",
      data: {
        email,
        username,
        role,
        token,
      },
    };
  }

  public static async loginUser(
    userLogin: ILoginUserDTO
  ): AuthUserResponseDTO<ILoginUserDTO> {
    const userResponse = await UserRepository.findUserByEmail(userLogin.email);
    const user = userResponse.data;

    if (!user) {
      return {
        code: 404,
        message: "USER_NOT_FOUND",
      };
    }

    const isValidPassword = await AuthService.isValidPassword(
      userLogin.password,
      user.password
    );
    if (!isValidPassword) {
      return {
        code: 400,
        message: "INVALID_CREDENTIALS",
      };
    }

    const token = AuthService.generateAccessToken({
      email: user.email,
      role: user.role,
    });

    return {
      code: 200,
      message: "Login successful",
      data: {
        email: user.email,
        username: user.username,
        role: user.role,
        token,
      },
    };
  }
}

export default AuthController;
