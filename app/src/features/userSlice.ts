import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../app/store"
import { post } from "../utils/api.utils"
import { LoginUserData, RegisterUserData, User } from "../types/auht.types"
import { setToken } from "../utils/jwt.utils"

export interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: string
  data: Omit<User, "token">
}

const initialState: UserState = {
  status: "idle",
  data: {
    email: "",
    username: "",
    role: "user",
  },
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (data: RegisterUserData) => {
    const { token, ...user } = await post<User, RegisterUserData>(
      "/auth/register",
      data,
    )
    setToken(token)

    return user
  },
)

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: LoginUserData) => {
    const { token, ...user } = await post<User, LoginUserData>(
      "/auth/login",
      data,
    )
    setToken(token)

    return user
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = undefined
        state.data = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = undefined
        state.data = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const selectUser = (state: RootState) => state.user.data

export default userSlice.reducer
