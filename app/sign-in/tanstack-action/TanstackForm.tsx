'use client'

import { useForm, mergeForm, useTransform } from '@tanstack/react-form' // step 1
import { zSignInSchema } from '@/lib/zschemas' // step 1
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { AnyFieldApi } from '@tanstack/react-form'
import { initialFormState } from '@tanstack/react-form/nextjs'

import { signInAction } from './actions'
import { useActionState } from 'react'
import { formOpts } from './shared-code'

function FieldInfo ({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.errors.length > 0 && (
        <p className='text-red-500 text-[10px] mt-1'>
          {field.state.meta.errors.map(error => error?.message).join('. ')}
        </p>
      )}
    </>
  )
}

export default function TanstackForm () {
  // Set up useActionState with properly typed initialState
  const [state, action, isPending] = useActionState(
    signInAction,
    initialFormState
  )

  const form = useForm({
    ...formOpts,
    // onBlur vs onChange, onBlur will only show the error after user tries to submit. Not right away
    validators: { onBlur: zSignInSchema },
    // Use transform to merge server validation results with client form state
    transform: useTransform(
      baseForm => (state ? mergeForm(baseForm, state) : baseForm),
      [state]
    )
    // Remove onSubmit since we'll use a validateAndSubmit wrapper instead
  })
  // This function validates with TanStack form first, then submits to server action if valid
  // Similar to your approach in ActionsForm.tsx
  function validateAndSubmit (formData: FormData) {
    // Check if TanStack form is valid
    if (!form.state.canSubmit) {
      // Trigger form validation display
      form.handleSubmit()
      return // Don't proceed if client validation fails
    }

    // At this point, client validation has passed
    console.log('Client validation passed, submitting to server')

    // IMPORTANT: The native form submission doesn't have access to TanStack form values
    // So we need to manually add them to the FormData object
    const values = form.state.values

    // Clear existing FormData (in case browser pre-filled it)
    // and add our validated form values
    for (const pair of formData.entries()) {
      formData.delete(pair[0])
    }

    // Add our validated values from TanStack form
    formData.append('email', values.email)
    formData.append('password', values.password)

    // Submit to server action with the validated FormData
    return action(formData)
  }

  return (
    <form
      // Use our validation wrapper function
      action={validateAndSubmit}
      className='space-y-4 py-2'
    >
      {/* email */}
      <form.Field name='email'>
        {field => (
          <div>
            <Input
              type='email'
              id='email'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
            {/* {field.state.meta.errors.length > 0 && (
              <p className='text-red-500 text-[10px] mt-1'>
                {field.state.meta.errors
                  .map(error => error?.message)
                  .join('. ')}
              </p>
            )} */}
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
              id='password'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
            {/* {field.state.meta.errors.length > 0 && (
              <p className='text-red-500 text-[10px] mt-1'>
                {field.state.meta.errors
                  .map(error => error?.message)
                  .join('. ')}
              </p>
            )} */}
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <Button type='submit' disabled={isPending}>
        {isPending ? 'Signing in...' : 'Submit'}
      </Button>

      {/* Display server-side validation errors if any */}
      {state?.errors?.map((error, i) => (
        <p key={i} className='text-red-500 text-[10px] mt-1'>
          SERVER-SIDE ERRORS...SHOULD ONLY DISPLAY IF CLIENT VALIDATED BUT
          SERVERS FAILED...
          {error}
        </p>
      ))}
    </form>
  )
}
