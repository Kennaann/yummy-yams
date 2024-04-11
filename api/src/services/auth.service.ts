import type { IUserTokenData } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import ConfigService from "./config.service";

class AuthService {
  public static generateAccessToken(data: IUserTokenData): string {
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
