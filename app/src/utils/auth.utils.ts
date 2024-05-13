import { AuthErrors, RegisterUserData } from "../types/auth.types"

const AuthErrorsToMessagesMap: Record<string, string> = {
  USER_NOT_FOUND: "Aucun utilisateur trouvé pour cette addresse email",
  INVALID_CREDENTIALS: "Login ou mot de passe incorrect",
  VALIDATION_ERRORS: "Veuillez vérifier les champs du formulaire",
  DEFAULT: "Une erreur est survenue",
  INVALID_PASSWORD: "Le format du mot de passe est incorrect",
  INVALID_EMAIL: "Le format de l'addresse email est incorrect",
  EMAIL_ALREADY_EXISTS: "Cette adresse email est déjà utilisée",
}

export const getAuthErrorMessage = (
  key: string,
  errors?: AuthErrors<RegisterUserData>,
): string => {
  let message = AuthErrorsToMessagesMap[key] ?? AuthErrorsToMessagesMap.DEFAULT

  if (errors?.email === "EMAIL_ALREADY_EXISTS") {
    message = AuthErrorsToMessagesMap.EMAIL_ALREADY_EXISTS
  }

  return message
}
