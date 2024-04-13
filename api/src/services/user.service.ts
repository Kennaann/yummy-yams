import bcrypt from "bcrypt";
import type { IPastryModel } from "../interfaces/pastries.interface";
import UserRepository from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

class UserService {
  public static updateUserAttempts(user: IUser, attempts: number) {
    const updatedUserProps: Partial<IUser> = {
      attempts: user.attempts + attempts,
    };
    return UserRepository.updateUser(user.email, updatedUserProps);
  }

  public static async isValidPassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}

export default UserService;
