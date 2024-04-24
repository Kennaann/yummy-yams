import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../app/store"
import { get } from "../utils/api.util"
import { Game } from "../types/game.type"

export interface GameState {
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: string
  game: Game
}

const initialState: GameState = {
  status: "idle",
  game: {
    isOpen: false,
  },
}

export const getIsGameOpen = createAsyncThunk(
  "game/getIsGameOpen",
  async () => {
    const response = await get<boolean>("/leaderboard/is-open")
    return response
  },
)

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIsGameOpen.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getIsGameOpen.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.game.isOpen = action.payload
      })
      .addCase(getIsGameOpen.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const selectIsGameOpen = (state: RootState) => state.game.game.isOpen

export default gameSlice.reducer
