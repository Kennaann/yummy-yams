import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

export interface PastriesState {
  id: string
  name: string
  image: string
}

const initialState: PastriesState[] = [
  {
    id: "1",
    name: "Fondant suprême",
    image: "fondant.jpeg",
  },
  {
    id: "2",
    name: "Cake tout Chocolat",
    image: "cake-choco.jpeg",
  },
]

export const pastriesSlice = createSlice({
  name: "pastries",
  initialState,
  reducers: {},
})

export default pastriesSlice.reducer
