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
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <p className='text-red-500 text-[10px] mt-1'>
          {field.state.meta.errors.map(error => error?.message).join('. ')}
        </p>
      )}
    </>
  )
}

export default function TanstackForm () {
  const [state, action, isPending] = useActionState(
    signInAction,
    initialFormState
  )

  const form = useForm({
    ...formOpts,
    validators: { onBlur: zSignInSchema },

    transform: useTransform(
      baseForm => (state ? mergeForm(baseForm, state) : baseForm),
      [state]
    )
  })

  function validateAndSubmit (formData: FormData) {
    if (!form.state.canSubmit) {
      form.handleSubmit()
      return
    }

    console.log('Client validation passed, submitting to server')

    const values = form.state.values

    for (const pair of formData.entries()) {
      formData.delete(pair[0])
    }

    formData.append('email', values.email)
    formData.append('password', values.password)

    return action(formData)
  }

  return (
    <form action={validateAndSubmit} className='space-y-4 py-2'>
      <form.Field name='email'>
        {field => (
          <div>
            <Input
              type='email'
              id='email'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
            />
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

      <Button type='submit' disabled={isPending}>
        {isPending ? 'Signing in...' : 'Submit'}
      </Button>

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
