import type { TValidationErrorsDTO } from "../interfaces/errors.interface";
import type {
  IUserModel,
  IRegisterUserDTO,
  IRegisterUserResponseDTO,
} from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import mangoose from "mongoose";
import AuthService from "./auth.service";

class UserService {
  public async registerUser(
    data: IRegisterUserDTO
  ): Promise<IRegisterUserResponseDTO> {
    try {
      const userModel = await this.createUser(data);

      const { email, role } = userModel.toObject();
      const token = AuthService.generateAccessToken({ email, role });

      return {
        code: 201,
        message: "User created",
        token,
      };
    } catch (error) {
      if (error instanceof mangoose.Error.ValidationError) {
        return this.handleValidationErrors(error);
      }

      console.error("UserService.creataUser : ", error);

      return {
        code: 500,
        message: "Internal server error",
      };
    }
  }

  private async createUser(data: IRegisterUserDTO) {
    const user: IUserModel = {
      email: data.email,
      password: data.password,
      username: `${data.firstname} ${data.lastname}`,
    };
    const userModel = new UserModel(user);
    return await userModel.save();
  }

  private handleValidationErrors(
    error: mangoose.Error.ValidationError
  ): IRegisterUserResponseDTO {
    const errors: TValidationErrorsDTO<IUserModel> = {};
    for (const err in error.errors) {
      errors[err as keyof IUserModel] = error.errors[err].message;
    }

    return {
      code: 400,
      message: "Validation error",
      errors,
    };
  }
}

export default UserService;
