'use server' // Mark this module's exports as Server Actions

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { zSignInSchema } from '@/lib/zschemas'
// Import necessary utilities from Tanstack Form for Next.js server-side validation
import {
  ServerValidateError, // Specific error type thrown by `createServerValidate` on validation failure
  createServerValidate // Factory function to create a server-side validation handler
} from '@tanstack/react-form/nextjs'
import { formOpts } from './shared-code'

// Create server validation function using Zod schema
// `createServerValidate` wraps your validation logic (Zod) and integrates it with Tanstack Form's state management.
// It expects FormData and returns a structured state object compatible with `mergeForm` on the client.
const serverValidate = createServerValidate({
  ...formOpts, // Share form options (like defaultValues) with the client setup
  // `onServerValidate` is the core server-side validation function.
  // It receives the parsed form `value` (based on `defaultValues` structure).
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

// The Server Action function.
// Receives the previous state (`prvState` - managed by `useActionState`) and the `FormData`.
export async function signInAction (prvState: unknown, formData: FormData) {
  // First, validate the incoming FormData using the `serverValidate` handler.
  try {
    await serverValidate(formData)
    // If `serverValidate` does not throw, validation passed on the server.
  } catch (e) {
    // If `serverValidate` throws an error:
    if (e instanceof ServerValidateError) {
      // If it's a `ServerValidateError`, it means the `onServerValidate` function returned an error.
      // `e.formState` contains the structured error state compatible with Tanstack Form.
      // Return this state directly. `useActionState` on the client will receive it,
      // and `useTransform`/`mergeForm` will merge it into the client form state, displaying the errors.
      return e.formState
    }
    // Handle other potential errors during server validation (e.g., unexpected issues).
    console.error('Validation error:', e)
    // Return a generic error structure if it wasn't a ServerValidateError.
    // This will also be available in `state.errors` on the client.
    return { errors: [(e as Error).message || 'Validation failed'] }
  }

  // --- Validation Passed ---
  // Extract data from FormData *after* server validation confirms its structure.
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Attempt the core business logic (sign-in).
  try {
    console.log('Attempting to sign in with email:', email)
    const result = await auth.api.signInEmail({ body: { email, password } })
    console.log('Sign-in result:', result)

    // Add a small delay to potentially allow session cookies to propagate if needed.
    await new Promise(resolve => setTimeout(resolve, 200))

    console.log('Redirecting to dashboard...')
    // IMPORTANT: If the action completes successfully *without* returning anything,
    // `useActionState` on the client will reset the form state to its initial state (`initialFormState`).
    // If you need to pass success messages or data back on success, return an object here.
  } catch (error: unknown) {
    // Handle errors during the sign-in process (e.g., incorrect credentials).
    console.error('Sign-in error:', error)
    console.log('Wwhy error???') // Keep temporary debugging logs if helpful
    // Redirect on failure - consider if returning an error state via `useActionState` might be preferable
    // depending on the desired UX (e.g., showing error message on the same form).
    redirect(
      `/sign-in/server?toast=error:${encodeURIComponent(
        (error as Error).message || 'Unknown error'
      )}!`
    )
    // Note: If you redirect *within* the action *after* an error,
    // the client might not get a chance to update its state via `useActionState` before navigating away.
    // Returning an error state object (`return { errors: [...] }`) is often better for displaying errors on the form itself.
  }

  // Redirect on successful sign-in.
  // This happens *after* the try/catch block completes successfully.
  redirect('/dashboard?toast=success:Signed in successfully!!')
  // Since a redirect happens, no state is explicitly returned for the success case here.
  // The client form state might briefly reset before the redirect occurs.
}
