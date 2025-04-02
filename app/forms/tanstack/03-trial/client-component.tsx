'use client'

import { useForm, useStore, useTransform } from '@tanstack/react-form'
import { initialFormState, mergeForm } from '@tanstack/react-form/nextjs'
import React from 'react'
import { formOpts, zSignInSchema } from './shared-code'
import { useActionState } from 'react'
import { someAction } from './action'
import { Input } from '@/components/ui/input'
import type { AnyFieldApi } from '@tanstack/react-form'

// function FieldInfo ({ field }: { field: AnyFieldApi }) {
//   return (
//     <>
//       {field.state.errors.map(error => (
//         <div key={error.message}>{error.message}</div>
//       ))}
//     </>
//   )
// }

function FieldInfo ({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {/* Only show errors if the field has been touched and has errors */}
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <p className='text-red-500 text-[10px] mt-1'>
          FieldInfo:{' '}
          {field.state.meta.errors.map(error => error?.message).join('. ')}
        </p>
      )}
    </>
  )
}

export default function ClientComponent () {
  const [state, action] = useActionState(someAction, initialFormState)

  const form = useForm({
    ...formOpts,
    validators: {
      onSubmit: zSignInSchema
    },
    transform: useTransform(baseForm => mergeForm(baseForm, state!), [state])
  })

  const formErrors = useStore(form.store, formState => formState.errors)

  console.log('formErrors ====>>>>', formErrors)

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        await form.handleSubmit()
        if (!form.state.errors) {
          const formData = new FormData(e.currentTarget)
          await action(formData)
        }
      }}
    >
      <form.Field name='email'>
        {field => (
          <div>
            <Input
              name={field.name}
              // type='email'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      <form.Field name='password'>
        {field => (
          <div>
            <Input
              name={field.name}
              // type='password'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>
      <form.Subscribe
        selector={formState => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button type='submit' disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </button>
        )}
      </form.Subscribe>
    </form>
  )
}
