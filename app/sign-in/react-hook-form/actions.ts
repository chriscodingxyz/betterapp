'use server'

import { auth } from '@/lib/auth'
// import { redirect } from 'next/navigation'
import { zSignInSchema } from '@/lib/zschemas'
// import { NextResponse } from 'next/server'
import { ActionResponse } from '@/lib/types'

export async function signInAction (
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  // Log the received data for debugging
  console.log('Received prevState:', prevState)
  console.log('Received formData:', Object.fromEntries(formData))

  // Extract data from FormData
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  // Validate with Zod
  const result = zSignInSchema.safeParse({ email, password })

  // Handle validation errors
  if (!result.success) {
    const firstError =
      result.error.flatten().fieldErrors.email?.[0] ||
      result.error.flatten().fieldErrors.password?.[0] ||
      'Validation failed'
    return { success: false, message: firstError }
  }

  // Attempt to sign in
  try {
    await auth.api.signInEmail({ body: result.data }) // Assuming auth API call
    return { success: true, message: 'Signed in successfully!' }
  } catch (error: unknown) {
    let errorMessage = 'Sign-in failed'
    if (error instanceof Error) {
      errorMessage = error.message
      if (error.message.includes('Invalid credentials')) {
        errorMessage = 'Invalid email or password'
      }
    }
    return { success: false, message: errorMessage }
  }
}
