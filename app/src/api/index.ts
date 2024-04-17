import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios"
import { APIResponse } from "../types/api.type"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const get = async <T>(endpoint: string) => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await client.get(endpoint)
    const pastries: T = response.data.data!

    return pastries
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch")
  }
}
