import { Pastry } from "./pastry.type"

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
