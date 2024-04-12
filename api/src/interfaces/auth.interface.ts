import type { ApiResponseDTO, ValidationErrorsDTO } from "./utils.interface";
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

interface IAuthUserData {
  email: string;
  username: string;
  role: TUserRoles;
  token?: string;
}

export type AuthUserResponseDTO<T> = ApiResponseDTO<
  IAuthUserData,
  ValidationErrorsDTO<T>
>;
export type TRegisterUserResponseDTO = AuthUserResponseDTO<IRegisterUserDTO>;
export type TLoginUserResponseDTO = AuthUserResponseDTO<ILoginUserDTO>;
