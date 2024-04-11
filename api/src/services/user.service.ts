import type { IUser, IUserDTO } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

class UserService {
  public async createUser(data: IUserDTO) {
    const user: IUser = {
      email: data.email,
      password: data.password,
      username: `${data.firstname} ${data.lastname}`,
    };
    const userModel = new UserModel(user);
    return await userModel.save();
  }
}

export default UserService;
