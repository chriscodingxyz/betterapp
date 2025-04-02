// client-component.tsx
'use client'

import { useActionState } from 'react'
import { initialFormState } from '@tanstack/react-form/nextjs'
// Notice the import is from `react-form`, not `react-form/nextjs`
import {
  mergeForm,
  useForm,
  useStore,
  useTransform
} from '@tanstack/react-form'
import someAction from './action'
import { formOpts } from './shared-code'
import { schema } from './shared-code'
import type { AnyFieldApi } from '@tanstack/react-form'

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

export const ClientComp = () => {
  const [state, action, isPending] = useActionState(
    someAction,
    initialFormState
  )

  const form = useForm({
    ...formOpts,
    validators: {
      onSubmit: schema
    },
    transform: useTransform(baseForm => mergeForm(baseForm, state!), [state])
  })

  const formErrors = useStore(form.store, formState => formState.errors)

  console.log('formErrors ====>>>>', formErrors)

  return (
    <form
      action={action}
      onSubmit={() => {
        console.log('😎 client submitting via onSubmit')
        form.handleSubmit()
      }}
    >
      {formErrors.map(error => (
        <p key={error as unknown as string}>{JSON.stringify(error)}</p>
      ))}
      <form.Field name='firstName'>
        {field => (
          <div>
            <input
              name='firstName'
              type='text'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
      <form.Field name='age'>
        {field => (
          <div>
            <input
              name='age'
              type='number'
              value={+field.state.value}
              onChange={e => field.handleChange(e.target.valueAsNumber)}
            />
            <FieldInfo field={field} />
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
      <div>
        <pre>{isPending ? 'Loading...' : 'Ready'}</pre>
      </div>
    </form>
  )
}
