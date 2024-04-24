import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios"
import { APIResponse } from "../types/api.types"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const get = async <T>(endpoint: string) => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await client.get(endpoint)

    return response.data.data!
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch")
  }
}

export const post = async <T, D>(endpoint: string, data: D) => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await client.post(
      endpoint,
      data,
    )
    return response.data.data!
  } catch (err) {
    console.log(err)
    throw new Error("Failed to post")
  }
}
