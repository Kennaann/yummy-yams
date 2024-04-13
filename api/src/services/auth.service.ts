import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { IUserTokenData } from "../interfaces/user.interface";
import ConfigService from "./config.service";

class AuthService {
  public static generateAccessToken(data: IUserTokenData): string {
    try {
      const secret = ConfigService.get("TOKEN_SECRET");
      return jwt.sign(data, secret, { expiresIn: "1h" });
    } catch (error) {
      console.error("AuthService.generateAccessToken : ", error);
      throw new Error("Error generating access token");
    }
  }

  public static async isValidPassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}

export default AuthService;
