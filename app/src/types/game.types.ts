import { Pastry } from "./pastry.types"

export type YamsThrow = {
  result: {
    combination: "YAMS" | "SQUARE" | "DOUBLE" | "NOTHING"
    dices: number[]
  }
  pastries?: Pastry[]
  attempts: number
}

export type Game = {
  isOpen: boolean
  throw?: YamsThrow
}

export type PrizeStatus = {
  message: string
  prize?: Pastry[]
}

export const ErrorResponseToMessageMap = {
  INVALID_TOKEN: "Votre session a expiré, vous allez être redirigé",
  CLOSED_GAME: "La partie est terminée, vous ne pouvez plus jouer",
  NO_ATTEMPS_LEFT: "Vous n'avez plus de tentatives",
  DEFAULT: "Une erreur inconnue est survenue",
} as const
