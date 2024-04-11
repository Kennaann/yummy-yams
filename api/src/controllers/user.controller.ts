import type { IUserDTO } from "../interfaces/user.interface";
import UserService from "../services/user.service";

class UserController {
  public static async createUser(user: IUserDTO) {
    const userService = new UserService();

    const response = await userService.createUser(user);
    console.log(response);

    return "User created successfully!";
  }
}

export default UserController;
