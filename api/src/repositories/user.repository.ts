import { IRegisterUserDTO } from "../interfaces/auth.interface";
import { ICreateUserModel, IUser } from "../interfaces/user.interface";
import {
  RepositoryResponse,
  ValidationErrorsDTO,
} from "../interfaces/utils.interface";
import UserModel from "../models/user.model";
import mangoose from "mongoose";

class UserRepository {
  public static async createUser(
    data: IRegisterUserDTO
  ): Promise<RepositoryResponse<IUser>> {
    try {
      const user = {
        email: data.email,
        password: data.password,
        username: `${data.firstname} ${data.lastname}`,
      };
      const userModel = new UserModel(user);
      const createdUser = await userModel.save();

      return {
        data: createdUser.toObject(),
      };
    } catch (error) {
      return this.handleCreateUserError(error);
    }
  }

  public static async findUserByEmail(
    email: string
  ): Promise<RepositoryResponse<IUser | null>> {
    const user = await UserModel.findOne({ email: email }).exec();

    return {
      data: user?.toObject() ?? null,
    };
  }

  public static async updateUser(
    email: string,
    data: Partial<IUser>
  ): Promise<void> {
    await UserModel.findOneAndUpdate({ email }, { ...data }).exec();
  }

  private static handleCreateUserError(
    error: unknown
  ): RepositoryResponse<IUser> {
    if (error instanceof mangoose.Error.ValidationError) {
      const errors: ValidationErrorsDTO<ICreateUserModel> = {};
      for (const err in error.errors) {
        errors[err as keyof ICreateUserModel] = error.errors[err].message;
      }

      return { errors };
    } else {
      console.error("UserRepository.createUser :", error);

      throw error;
    }
  }
}

export default UserRepository;
