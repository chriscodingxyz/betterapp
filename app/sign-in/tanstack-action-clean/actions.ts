'use server' // Mark this module's exports as Server Actions

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { zSignInSchema } from '@/lib/zschemas'
import {
  ServerValidateError,
  createServerValidate
} from '@tanstack/react-form/nextjs'
import { formOpts } from './shared-code'

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: zSignInSchema
  // onServerValidate: ({ value }) => {
  //   try {
  //     // Attempt to parse the form value using the Zod schema.
  //     zSignInSchema.parse(value)
  //     // If parsing succeeds, return `undefined` (or void) to indicate no validation errors.
  //     return undefined
  //   } catch (error) {
  //     // If Zod parsing fails, it throws an error (usually a ZodError).
  //     // `createServerValidate` expects a string error message or an object mapping field names to errors.
  //     // Here, we simplify by returning the error message (though you could format Zod errors more granularly).
  //     if (error instanceof Error) {
  //       return error.message // Return the Zod error message string.
  //     }
  //     return 'Validation failed' // Fallback error message.
  //   }
  // }
})

export async function signInAction (prvState: unknown, formData: FormData) {
  try {
    await serverValidate(formData)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }
    console.error('Validation error:', e)
    return { errors: [(e as Error).message || 'Validation failed'] }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    console.log('Attempting to sign in with email:', email)
    const result = await auth.api.signInEmail({ body: { email, password } })
    console.log('Sign-in result:', result)

    await new Promise(resolve => setTimeout(resolve, 200))

    console.log('Redirecting to dashboard...')
  } catch (error: unknown) {
    console.error('Sign-in error:', error)
    console.log('Wwhy error???') // Keep temporary debugging logs if helpful
    redirect(
      `/sign-in/server?toast=error:${encodeURIComponent(
        (error as Error).message || 'Unknown error'
      )}!`
    )
  }

  redirect('/dashboard?toast=success:Signed in successfully!!')
}
