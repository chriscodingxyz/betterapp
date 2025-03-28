'use server'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { zSignInSchema } from '@/lib/zschemas'
import {
  ServerValidateError,
  createServerValidate
} from '@tanstack/react-form/nextjs'
import { formOpts } from './shared-code'

// Create server validation function using Zod schema
const serverValidate = createServerValidate({
  ...formOpts,
  // Apply Zod schema validation on the server side
  onServerValidate: ({ value }) => {
    try {
      zSignInSchema.parse(value)
      return undefined // No errors
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Validation failed'
    }
  }
})

export async function signInAction (prvState: unknown, formData: FormData) {
  // First validate the form data using Zod schema
  try {
    await serverValidate(formData)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }
    // Other validation errors
    console.error('Validation error:', e)
    return { errors: [(e as Error).message || 'Validation failed'] }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Attempt to sign in
  try {
    console.log('Attempting to sign in with email:', email)
    const result = await auth.api.signInEmail({ body: { email, password } })
    console.log('Sign-in result:', result)

    // Add a small delay to ensure cookie is set properly
    await new Promise(resolve => setTimeout(resolve, 200))

    console.log('Redirecting to dashboard...')
  } catch (error: unknown) {
    console.error('Sign-in error:', error)
    console.log('Wwhy error???')
    redirect(
      `/sign-in/server?toast=error:${encodeURIComponent(
        (error as Error).message || 'Unknown error'
      )}!`
    )
  }

  // If all good...then finalize
  redirect('/dashboard?toast=success:Signed in successfully!!')
}
