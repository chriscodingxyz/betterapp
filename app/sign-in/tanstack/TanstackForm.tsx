'use client'

import { useForm } from '@tanstack/react-form' // step 1
import { zSignInSchema, zSignInSchemaType } from '@/lib/zschemas' // step 1
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { AnyFieldApi } from '@tanstack/react-form'
import { signInAction } from './actions'

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
  // const [state, formAction, isPending] = useActionState(signInAction, {
  //   success: '',
  //   error: undefined
  // })

  const form = useForm({
    // step 2
    defaultValues: {
      email: '',
      password: ''
    } as zSignInSchemaType,
    // onBlur vs onChange, onBlur will only show the error after user tries to submit. Not right away
    validators: { onBlur: zSignInSchema },
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value, null, 2))
      console.log('Tanstack Form Value ==>>', value)

      // Create a new FormData object
      const formData = new FormData()

      // Append each field from value to formData
      formData.append('email', value.email)
      formData.append('password', value.password)

      // Pass the formData to signInAction
      await signInAction(formData)
      alert('After signInAction')
    }
  })
  return (
    // Step 4, add form.handleSubmit
    <form
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit(e)
      }}
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

      <Button type='submit'>Submit</Button>
    </form>
  )
}
