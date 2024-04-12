import type { IRegisterUserDTO } from "../interfaces/auth.interface";

import UserModel from "../models/user.model";
import type { IPastryModel } from "../interfaces/pastries.interface";
import UserRepository from "../repositories/user.repository";
import type { RepositoryResponse } from "../interfaces/utils.interface";
import type { IUser } from "../interfaces/user.interface";

class UserService {
  public static async createUser(
    data: IRegisterUserDTO
  ): Promise<RepositoryResponse<IUser>> {
    return UserRepository.createUser(data);
  }

  public static async findUserByEmail(email: string) {
    return await UserModel.findOne({ email: email }).exec();
  }

  public static async updateUser(
    email: string,
    pastries: IPastryModel[] | null
  ) {
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
