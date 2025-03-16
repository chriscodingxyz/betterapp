'use client'

import React, { useActionState, useEffect } from 'react'
import { addTodoAction } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { zTodoSchema } from '@/lib/zschemas'

export default function ActionsForm () {
  const [state, formAction, isPending] = useActionState(addTodoAction, {
    success: '',
    error: undefined
  })
  // Only if we want to preserver the todo when theres an error, this avoids react-hook-form
  // But also adds some extra state we wouldn't necessarily want
  // const [title, setTitle] = React.useState('') // Controlled input state

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      // setTitle('') // Reset the input on success
    }
    if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  function validateForm (formData: FormData) {
    const data = Object.fromEntries(formData.entries())
    console.log('Client side validation')
    const result = zTodoSchema.safeParse(data)

    if (!result.success) {
      toast.error(result.error.errors[0].message)
      console.log(result.error.errors[0].message)
      return // Simply return to stop the chain—no throw
    }

    console.log('Client side passed, now onto server side')
    return formAction(formData)
  }

  return (
    <div>
      {/* <div className='text-sm border '>{state.success || state.error}</div> */}
      <form action={validateForm} className='space-y-4'>
        <Input
          type='text'
          name='title'
          // value={title} // Controlled value
          // onChange={e => setTitle(e.target.value)} // Update state on change
        />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>
    </div>
  )
}
