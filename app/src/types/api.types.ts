export interface APIResponse<T> {
  message: string
  data?: T
  error?: {
    code: number
    message: string
    errors?: {
      [P in keyof T]?: string
    }
  }
}
