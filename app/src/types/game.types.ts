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
