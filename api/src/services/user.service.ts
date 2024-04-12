import UserModel from "../models/user.model";
import type { IPastryModel } from "../interfaces/pastries.interface";
import UserRepository from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

class UserService {
  public static handleUserAttempt(
    user: IUser,
    pastries: IPastryModel[] | null
  ) {
    const updatedUserProps: Partial<IUser> = {
      attempts: (user.attempts -= 1),
    };

    if (pastries) {
      updatedUserProps.attempts = 0;
      updatedUserProps.prize = {
        pastries,
        createdAt: new Date(),
      };
    }

    return UserRepository.updateUser(user.email, updatedUserProps);
  }
}

export default UserService;
