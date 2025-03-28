'use client'

import { useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

// Define a more specific type for the action state
export type ActionState<T = unknown> = {
  success?: string
  error?: string
  data?: T
}

// Re-export as FormActionState for backwards compatibility
export type FormActionState<T = unknown> = ActionState<T>

// 🚀 **Reusable Client Hook**: Custom hook that handles form state, validation, and notifications
export function useFormAction<T = unknown>(
  action: (state: ActionState<T>, formData: FormData) => Promise<ActionState<T>>,
  schema: { safeParse: (data: Record<string, unknown>) => { success: boolean; error?: { errors: Array<{ message: string }> }; data?: T } },
  initialState = { success: '', error: undefined }
) {
  // 🚀 Form reference for resetting
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(action, initialState)

  // 🚀 Validation and submission function
  const validateAndSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries())
    const result = schema.safeParse(data)

    if (!result.success && result.error?.errors?.length) {
      toast.error(result.error.errors[0].message)
      return
    }

    return formAction(formData)
  }

  // 🚀 Utility to reset the form
  const resetForm = () => {
    formRef.current?.reset()
  }

  // 🚀 Automatic toast notifications and form reset
  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      resetForm()
    }
    if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  return {
    state,
    isPending,
    formRef,
    validateAndSubmit,
    resetForm
  }
} 