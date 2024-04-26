import { User } from "./auht.types"
import { Pastry } from "./pastry.types"

export type Win = {
  winner: Pick<User, "username" | "email">
  prize: Pastry[]
  createdAt: string
  _id: string
}
