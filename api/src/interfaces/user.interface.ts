import type { TValidationErrorsDTO } from "./errors.interface";

export interface ICreateUserDTO {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface ICreateUserResponseDTO {
  code: number;
  message: string;
  errors?: TValidationErrorsDTO<IUser>;
}

export interface IUser {
  email: string;
  password: string;
  username: string;
}
