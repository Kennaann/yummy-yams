import type {
  IRegisterUserDTO,
  IRegisterUserResponseDTO,
  IUserTokenData,
} from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import ConfigService from "./config.service";
import UserService from "./user.service";
import mangoose from "mongoose";
class AuthService {
  public static async registerUser(
    data: IRegisterUserDTO
  ): Promise<IRegisterUserResponseDTO> {
    try {
      const userModel = await UserService.createUser(data);

      const { email, username, role } = userModel.toObject();
      const token = this.generateAccessToken({ email, role });

      return {
        code: 201,
        message: "User created",
        data: {
          email,
          username,
          role,
        },
        token,
      };
    } catch (error) {
      if (error instanceof mangoose.Error.ValidationError) {
        return UserService.handleValidationErrors(error);
      }

      console.error("UserService.creataUser : ", error);

      return {
        code: 500,
        message: "Internal server error",
      };
    }
  }

  private static generateAccessToken(data: IUserTokenData): string {
    try {
      const secret = ConfigService.get("TOKEN_SECRET");
      return jwt.sign(data, secret, { expiresIn: "2d" });
    } catch (error) {
      console.error("AuthService.generateAccessToken : ", error);
      throw new Error("Error generating access token");
    }
  }
}

export default AuthService;
