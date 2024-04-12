import {
  IAuthUserResponseDTO,
  IRegisterUserDTO,
} from "../interfaces/auth.interface";
import type { TValidationErrorsDTO } from "../interfaces/utils.interface";
import type { ICreateUserModel } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import mangoose, { Types } from "mongoose";
import { IPastry } from "../interfaces/pastries.interface";

class UserService {
  public static async createUser(data: IRegisterUserDTO) {
    const user: ICreateUserModel = {
      email: data.email,
      password: data.password,
      username: `${data.firstname} ${data.lastname}`,
    };
    const userModel = new UserModel(user);
    return await userModel.save();
  }

  public static async findUserByEmail(email: string) {
    return await UserModel.findOne({ email: email }).exec();
  }

  public static handleValidationErrors(
    error: mangoose.Error.ValidationError
  ): IAuthUserResponseDTO<IRegisterUserDTO> {
    const errors: TValidationErrorsDTO<ICreateUserModel> = {};
    for (const err in error.errors) {
      errors[err as keyof ICreateUserModel] = error.errors[err].message;
    }

    return {
      code: 400,
      message: "Validation error",
      errors,
    };
  }

  public static async updateUser(email: string, pastries: IPastry[] | null) {
    if (!pastries) {
      return await UserModel.findOneAndUpdate(
        { email },
        { $inc: { attempts: 1 } }
      ).exec();
    }

    return await UserModel.findOneAndUpdate(
      { email },
      {
        attempts: 0,
        prize: { pastries, createdAt: Date.now() },
      }
    ).exec();
  }
}

export default UserService;
