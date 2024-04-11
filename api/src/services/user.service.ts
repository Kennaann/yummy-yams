import type { TValidationErrorsDTO } from "../interfaces/errors.interface";
import type {
  ICreateUserModel,
  IRegisterUserDTO,
  IRegisterUserResponseDTO,
} from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import mangoose from "mongoose";

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

  public static handleValidationErrors(
    error: mangoose.Error.ValidationError
  ): IRegisterUserResponseDTO {
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
}

export default UserService;
