import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { IUserTokenData } from "../interfaces/user.interface";
import ConfigService from "./config.service";
import type {
  AuthUserResponseDTO,
  ILoginUserDTO,
  IRegisterUserDTO,
} from "../interfaces/auth.interface";
import UserRepository from "../repositories/user.repository";

class AuthService {
  public static async registerUser(
    data: IRegisterUserDTO
  ): Promise<AuthUserResponseDTO<IRegisterUserDTO>> {
    const response = await UserRepository.createUser(data);

    if (response.errors) {
      return {
        code: 400,
        message: "Validation errors",
        errors: response.errors,
      };
    }

    const { email, username, role } = response.data;
    const token = this.generateAccessToken({ email, role });

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
  ): Promise<AuthUserResponseDTO<ILoginUserDTO>> {
    const userResponse = await UserRepository.findUserByEmail(userLogin.email);
    const user = userResponse.data;

    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    const isValidPassword = await this.isValidPassword(
      userLogin.password,
      user.password
    );
    if (!isValidPassword) {
      return {
        code: 400,
        message: "Invalid password",
      };
    }

    const token = this.generateAccessToken({
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

  private static generateAccessToken(data: IUserTokenData): string {
    try {
      const secret = ConfigService.get("TOKEN_SECRET");
      return jwt.sign(data, secret, { expiresIn: "1h" });
    } catch (error) {
      console.error("AuthService.generateAccessToken : ", error);
      throw new Error("Error generating access token");
    }
  }

  private static async isValidPassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}

export default AuthService;
