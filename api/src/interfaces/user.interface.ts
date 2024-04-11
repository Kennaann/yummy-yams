import type { TValidationErrorsDTO } from "./errors.interface";

export interface IRegisterUserDTO {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface IRegisterUserResponseDTO {
  code: number;
  message: string;
  token?: string;
  errors?: TValidationErrorsDTO<IUserModel>;
}

export interface IUserModel {
  email: string;
  password: string;
  username: string;
}

export interface IUserTokenData {
  email: string;
  role: string;
}
