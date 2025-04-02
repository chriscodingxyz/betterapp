// ✅ For API routes and server actions
export type ValidationErrors = Record<string, string[]>

export type SuccessResponse<T = unknown> = {
  success: true
  message?: string
  data?: T
}

export type ErrorResponse = {
  success: false
  error: string
  errors?: ValidationErrors
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse

// ✅ For server actions using useActionState
export type ActionState<T = unknown> = {
  success: boolean
  message?: string
  error?: string
  errors?: ValidationErrors
  values?: Record<string, string>
  data?: T
}
