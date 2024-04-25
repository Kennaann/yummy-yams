import axios, { AxiosResponse, AxiosError } from "axios"
import { APIResponse } from "../types/api.types"
import { getToken } from "./jwt.utils"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const get = async <T>(endpoint: string) => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await client.get(endpoint, {
      headers: { Authorization: `Bearer ${getToken() ?? ""}` },
    })

    return response.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const post = async <T, D>(endpoint: string, data: D) => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await client.post(
      endpoint,
      data,
      { headers: { Authorization: `Bearer ${getToken() ?? ""}` } },
    )
    return response.data.data!
  } catch (err) {
    handleApiError(err)
  }
}

const handleApiError = (error: unknown): APIResponse<never> => {
  if (error instanceof AxiosError) {
    return {
      message: "Failed to fetch",
      error: {
        code: error.response?.status!,
        message: error.response?.data.message!,
      },
    }
  }

  return {
    message: "Failed to fetch",
    error: {
      code: 500,
      message: "Internal server error",
    },
  }
}
