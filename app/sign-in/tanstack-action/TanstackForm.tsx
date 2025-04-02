'use client'

import { useForm, mergeForm, useTransform } from '@tanstack/react-form' // step 1
import { zSignInSchema } from '@/lib/zschemas' // step 1
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { AnyFieldApi } from '@tanstack/react-form'
// `initialFormState` provides a type-safe initial state for `useActionState`
// compatible with Tanstack Form's server validation state structure.
import { initialFormState } from '@tanstack/react-form/nextjs'

import { signInAction } from './actions'
// `useActionState` is a React hook for managing state updates from Server Actions.
import { useActionState } from 'react'
import { formOpts } from './shared-code'

// Helper component to display validation errors for a given field.
function FieldInfo ({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {/* Only show errors if the field has been touched and has errors */}
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <p className='text-red-500 text-[10px] mt-1'>
          {field.state.meta.errors.map(error => error?.message).join('. ')}
        </p>
      )}
    </>
  )
}

export default function TanstackForm () {
  // Set up useActionState with properly typed initialState
  // `useActionState` manages the state returned by the Server Action (`signInAction`).
  // It provides:
  // - `state`: The current state returned by the action (initially `initialFormState`).
  //            After action execution, it holds server validation results or success/error messages.
  // - `action`: A wrapped version of the server action to be passed to the <form>.
  // - `isPending`: A boolean indicating if the server action is currently running.
  const [state, action, isPending] = useActionState(
    signInAction,
    initialFormState // Use the type-safe initial state for server validation feedback
  )

  // `useForm` is the core hook from Tanstack Form to manage form state.
  const form = useForm({
    ...formOpts, // Spread shared options like defaultValues
    // `validators` defines client-side validation rules.
    // `onBlur`: Validates when the field loses focus. Zod schema is used here.
    // `onChange`: Validates on every keystroke.
    // `onSubmit`: Validates only when the form is submitted.
    validators: { onBlur: zSignInSchema },
    // `useTransform` + `mergeForm` is the key pattern for integrating server validation state
    // returned via `useActionState` back into the client-side Tanstack Form state.
    // - `useTransform`: A hook that allows modifying the form state based on external data (here, the `state` from `useActionState`).
    // - `mergeForm`: A utility that intelligently merges the server validation state (`state`)
    //                (which might contain errors from `createServerValidate`) into the base form state.
    // - The dependency array `[state]` ensures this transform runs whenever the server action state changes.
    transform: useTransform(
      baseForm => (state ? mergeForm(baseForm, state) : baseForm),
      [state]
    )
    // `onSubmit` is intentionally removed here because we use a custom `validateAndSubmit`
    // function in the <form action={...}> prop to handle both client validation and server action submission.
  })
  // This function validates with Tanstack form first, then submits to server action if valid
  // Similar to your approach in ActionsForm.tsx
  function validateAndSubmit (formData: FormData) {
    // Check if Tanstack form is valid based on client-side validators (`zSignInSchema` here).
    // `form.state.canSubmit` is true only if all client-side validations pass.
    if (!form.state.canSubmit) {
      // If client validation fails, trigger Tanstack Form's built-in submit handler
      // This marks fields as touched and displays validation errors defined in `validators`.
      form.handleSubmit()
      return // Don't proceed to server action if client validation fails
    }

    // At this point, client validation has passed
    console.log('Client validation passed, submitting to server')

    // IMPORTANT: When using <form action={...}> with Server Actions and Tanstack Form,
    // the default form submission DOES NOT automatically include Tanstack Form's state (`form.state.values`).
    // It only includes the native input values present in the DOM *at the time of submission*.
    // To ensure the server action receives the values that passed client-side validation:
    // 1. Get the validated values from Tanstack Form's state.
    const values = form.state.values

    // 2. Clear the `formData` object provided by the native form submission event.
    //    This removes potentially stale or incorrect values from the DOM elements.
    for (const pair of formData.entries()) {
      formData.delete(pair[0])
    }

    // 3. Append the correct, client-validated values from `form.state.values` to the `formData`.
    formData.append('email', values.email)
    formData.append('password', values.password)

    // 4. Call the server action (wrapped by `useActionState`) with the corrected `formData`.
    return action(formData)
  }

  return (
    <form
      // Use our custom validation wrapper function for the form's action.
      action={validateAndSubmit}
      className='space-y-4 py-2'
      // `onSubmit` prop is not needed here as `action` handles the submission logic.
    >
      {/* email */}
      {/* `form.Field` component connects an input to the Tanstack Form state. */}
      <form.Field
        // `name` must match a key in `defaultValues` and the Zod schema.
        name='email'
        // Children is a render prop function receiving the `field` API.
      >
        {field => (
          <div>
            {/* Standard input component */}
            <Input
              type='email'
              // name='email'
              id='email' // Use field.name for ID if desired: id={field.name}
              // Bind input value to field state
              value={field.state.value}
              // `handleChange` updates the field state in Tanstack Form
              onChange={e => field.handleChange(e.target.value)}
              // `handleBlur` is needed for `onBlur` validation to trigger
              onBlur={field.handleBlur}
              // Optionally add aria-invalid based on field errors
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {/* Display validation errors using the FieldInfo helper */}
            {/* `field.state.meta.errors` contains validation errors for this specific field */}
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      {/* password */}
      <form.Field name='password'>
        {field => (
          <div>
            <Input
              type='password'
              // name='password'
              id='password'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      {/* Disable button while the server action is pending */}
      <Button type='submit' disabled={isPending}>
        {isPending ? 'Signing in...' : 'Submit'}
      </Button>

      {/* Display general server-side errors (e.g., network issues, non-validation errors from action) */}
      {/* These are distinct from field-specific validation errors handled by `mergeForm`. */}
      {state?.errors?.map((error, i) => (
        <p key={i} className='text-red-500 text-[10px] mt-1'>
          SERVER-SIDE ERRORS...SHOULD ONLY DISPLAY IF CLIENT VALIDATED BUT
          SERVERS FAILED...
          {/* Render the generic error message from the server action's state */}
          {error}
        </p>
      ))}
    </form>
  )
}
