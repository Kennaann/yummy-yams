import { Pastry } from "./pastry.types"

export type YamsResult = {
  combination: "YAMS" | "SQUARE" | "DOUBLE" | "NOTHING"
  dices: number[]
  pastries?: Pastry[]
  attempts: number
}

export type Game = {
  isOpen: boolean
  result?: YamsResult
}
