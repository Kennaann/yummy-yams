export type AuthErrors<T> = {
  [P in keyof T]?: string
}

export type AuthFormState<T> = {
  isValid: boolean
  errors: AuthErrors<T>
}

export type LoginUserData = {
  email: string
  password: string
}

export type RegisterUserData = {
  email: string
  password: string
  firstname: string
  lastname: string
}

export type User = {
  email: string
  username: string
  role: "admin" | "user"
  token: string
}
