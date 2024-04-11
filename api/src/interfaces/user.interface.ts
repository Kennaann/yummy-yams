import type { TValidationErrorsDTO } from "./errors.interface";

export interface IRegisterUserDTO {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface IAuthUserResponseDTO<T> {
  code: number;
  message: string;
  data?: {
    email: string;
    username: string;
    role: "user" | "admin";
  };
  token?: string;
  errors?: TValidationErrorsDTO<T>;
}

export interface ICreateUserModel {
  email: string;
  password: string;
  username: string;
}

export interface IUserTokenData {
  email: string;
  role: "user" | "admin";
}

export interface ILoginUserDTO {
  email: string;
  password: string;
}
