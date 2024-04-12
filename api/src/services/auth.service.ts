import type { IUserTokenData } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import ConfigService from "./config.service";
import UserService from "./user.service";
import mangoose from "mongoose";
import type {
  IAuthUserResponseDTO,
  ILoginUserDTO,
  IRegisterUserDTO,
} from "../interfaces/auth.interface";
import type { Request, Response, NextFunction } from "express";

class AuthService {
  public static async registerUser(
    data: IRegisterUserDTO
  ): Promise<IAuthUserResponseDTO<IRegisterUserDTO>> {
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

  public static async loginUser(
    data: ILoginUserDTO
  ): Promise<IAuthUserResponseDTO<ILoginUserDTO>> {
    try {
      const user = await UserService.findUserByEmail(data.email);
      if (!user) {
        return {
          code: 404,
          message: "User not found",
        };
      }

      const isValidPassword = await user.isValidPassword(data.password);
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
        },
        token,
      };
    } catch (error) {
      console.error("AuthService.loginUser : ", error);
      return {
        code: 500,
        message: "Internal server error",
      };
    }
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

  public static authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(400).send("No token provided");

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403).send("Invalid token");
        }

        req.body.user = user;
        next();
      }
    );
  }
}

export default AuthService;
