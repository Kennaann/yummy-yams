import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../app/store"
import { get } from "../utils/api.utils"
import { Game, YamsResult } from "../types/game.types"

export interface GameState {
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: {
    code: number
    message: string
  }
  data: Game
}

const initialState: GameState = {
  status: "idle",
  data: {
    isOpen: false,
  },
}

export const getIsGameOpen = createAsyncThunk(
  "game/getIsGameOpen",
  async (_, { rejectWithValue }) => {
    const response = await get<boolean>("/leaderboard/is-open")

    if (response.error) {
      return rejectWithValue(response.error)
    }
    return response.data!
  },
)

export const getYamsResults = createAsyncThunk(
  "game/getYamsResults",
  async (_, { rejectWithValue }) => {
    const response = await get<YamsResult>("/yams")

    if (response.error) {
      return rejectWithValue(response.error)
    }
    return response.data!
  },
)

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIsGameOpen.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data.isOpen = action.payload
      })
      .addCase(getIsGameOpen.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(getYamsResults.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data.result = action.payload
        state.error = undefined
      })
      .addCase(getYamsResults.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as GameState["error"]
      })
  },
})

export const selectIsGameOpen = (state: RootState) => state.game.data.isOpen
export const selectYamsResult = (state: RootState) => state.game.data.result

export default gameSlice.reducer
