import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../app/store"
import { post } from "../utils/api.utils"
import { LoginUserData, RegisterUserData, User } from "../types/auht.types"
import { setToken } from "../utils/jwt.utils"

export interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: {
    code: number
    message: string
  }
  data?: Omit<User, "token">
}

const initialState: UserState = {
  status: "idle",
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (data: RegisterUserData, { rejectWithValue }) => {
    const response = await post<User, RegisterUserData>("/auth/register", data)

    if (response.error) {
      return rejectWithValue(response.error)
    }

    const { token, ...user } = response.data!
    setToken(token)

    return user
  },
)

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: LoginUserData, { rejectWithValue }) => {
    const response = await post<User, LoginUserData>("/auth/login", data)
    if (response.error) {
      return rejectWithValue(response.error)
    }

    const { token, ...user } = response.data!
    setToken(token)

    return user
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: state => {
      state.status = "idle"
      state.error = undefined
      state.data = undefined
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = undefined
        state.data = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as UserState["error"]
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = undefined
        state.data = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as UserState["error"]
      })
  },
})

export const { removeUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user.data

export default userSlice.reducer
