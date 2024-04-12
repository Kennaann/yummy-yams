export type TValidationErrorsDTO<T> = {
  [P in keyof T]?: string;
};
