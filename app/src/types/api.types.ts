export interface APIResponse<T> {
  message: string
  data?: T
  error?: {
    code: number
    message: string
  }
}
