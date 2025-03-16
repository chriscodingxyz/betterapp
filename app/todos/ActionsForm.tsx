'use client'

import React, { useActionState, useEffect } from 'react'
import { addTodoAction } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
// import { z } from 'zod'

export default function ActionsForm () {
  const [state, formAction, isPending] = useActionState(addTodoAction, {
    success: '',
    error: undefined
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
    }
    if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <div>
      ActionsForm:
      <div className='text-sm'>{state.success || state.error}</div>
      {/* <form action={formAction} className='space-y-4'> */}
      <form action={formAction} className='space-y-4'>
        <Input type='text' name='title' required />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>
    </div>
  )
}
