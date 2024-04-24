import {
  AuthErrors,
  LoginUserData,
  RegisterUserData,
} from "../types/auht.types"

const EMAIL_REGEX = /\S+@\S+\.\S+/
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?\&\-\_])[A-Za-z\d@$!%*#?\&\-\_]{8,}$/

const ERROR_MESSAGES = {
  email: {
    required: "L'adresse email est requise",
    invalid: "L'adresse email est invalide",
  },
  password: {
    required: "Le mot de passe est requis",
    invalid: "Le mot de passe est invalide",
  },
}

export const validateLoginForm = (
  data: LoginUserData,
): AuthErrors<LoginUserData> => {
  const errors: AuthErrors<LoginUserData> = {}

  if (!isValidInput(data.email, EMAIL_REGEX)) {
    errors.email = ERROR_MESSAGES.email.invalid
  }
  if (!isValidInput(data.password, PASSWORD_REGEX)) {
    errors.password = ERROR_MESSAGES.password.invalid
  }
  if (!data.email) errors.email = ERROR_MESSAGES.email.required
  if (!data.password) errors.password = ERROR_MESSAGES.password.required

  return errors
}

export const validateRegisterForm = (
  data: RegisterUserData,
): AuthErrors<RegisterUserData> => {
  const errors: AuthErrors<RegisterUserData> = {}

  if (!isValidInput(data.email, EMAIL_REGEX)) {
    errors.email = ERROR_MESSAGES.email.invalid
  }
  if (!isValidInput(data.password, PASSWORD_REGEX)) {
    errors.password = ERROR_MESSAGES.password.invalid
  }
  if (!data.email) errors.email = ERROR_MESSAGES.email.required
  if (!data.password) errors.password = ERROR_MESSAGES.password.required
  if (!data.firstname) errors.firstname = "Le prénom est requis"
  if (!data.lastname) errors.lastname = "Le nom est requis"

  return errors
}

const isValidInput = (input: string, pattern: RegExp): boolean => {
  return pattern.test(input)
}
