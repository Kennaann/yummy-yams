export const DICES_DOTS_MAP = [
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 0],
    [1, 1, 1],
  ],
]

export const ErrorResponseToMessageMap = {
  INVALID_TOKEN: "Votre session a expiré, vous allez être redirigé.",
  CLOSED_GAME: "La partie est terminée, vous ne pouvez plus jouer.",
  NO_ATTEMPS_LEFT: "Vous n'avez plus de tentatives.",
  NO_PASTRIES_LEFT: "Il n'y a plus de pâtisseries à gagner.",
  DEFAULT: "Une erreur interne est survenue.",
} as const
