export type ValidationErrorsDTO<T> = {
  [P in keyof T]?: string;
};

export type RepositoryResponse<T> =
  | {
      data: T;
      errors?: never;
    }
  | { data?: never; errors: ValidationErrorsDTO<T> };

export type ApiResponseDTO<T, E> = {
  code: number;
  message: string;
  data?: T;
  errors?: E;
};
