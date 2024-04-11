import type { TValidationErrorsDTO } from "./errors.interface";
import type { TUserRoles } from "./user.interface";

export interface IRegisterUserDTO {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface ILoginUserDTO {
  email: string;
  password: string;
}

export interface IAuthUserResponseDTO<T> {
  code: number;
  message: string;
  data?: {
    email: string;
    username: string;
    role: TUserRoles;
  };
  token?: string;
  errors?: TValidationErrorsDTO<T>;
}

export type TRegisterUserResponseDTO = IAuthUserResponseDTO<IRegisterUserDTO>;
export type TLoginUserResponseDTO = IAuthUserResponseDTO<ILoginUserDTO>;
