import type { TValidationErrorsDTO } from "../interfaces/errors.interface";
import type {
  IUser,
  ICreateUserDTO,
  ICreateUserResponseDTO,
} from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import mangoose from "mongoose";

class UserService {
  public async createUser(
    data: ICreateUserDTO
  ): Promise<ICreateUserResponseDTO> {
    try {
      const user: IUser = {
        email: data.email,
        password: data.password,
        username: `${data.firstname} ${data.lastname}`,
      };
      const userModel = new UserModel(user);

      await userModel.save();
      // TODO: Create User Token

      return {
        code: 201,
        message: "User created",
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

  private handleValidationErrors(
    error: mangoose.Error.ValidationError
  ): ICreateUserResponseDTO {
    const errors: TValidationErrorsDTO<IUser> = {};
    for (const err in error.errors) {
      errors[err as keyof IUser] = error.errors[err].message;
    }

    return {
      code: 400,
      message: "Validation error",
      errors,
    };
  }
}

export default UserService;
