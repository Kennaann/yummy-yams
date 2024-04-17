import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Pastry } from "../../types/pastries.type"
import { get } from "../../api"

export interface PastriesState {
  status: "idle" | "succeeded" | "failed"
  error?: string
  pastries: Pastry[]
}

const initialState: PastriesState = {
  status: "idle",
  pastries: [],
}

export const getPastries = createAsyncThunk(
  "pastries/getPastries",
  async () => {
    const response = await get<Pastry[]>("/pastries")
    return response
  },
)

export const pastriesSlice = createSlice({
  name: "pastries",
  initialState,
  reducers: {
    pastriesAdded: (state, action: PayloadAction<Pastry[]>) => {
      state.pastries.push(...action.payload)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPastries.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.pastries = action.payload
      })
      .addCase(getPastries.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const selectAllPastries = (state: RootState) => state.pastries.pastries

export default pastriesSlice.reducer
