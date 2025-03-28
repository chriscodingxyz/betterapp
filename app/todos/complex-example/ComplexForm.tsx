'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// You may need to create this component if it doesn't exist
// Temporarily using a regular textarea
// import { Textarea } from '@/components/ui/textarea'
import { useFormAction } from '@/lib/hooks/form-action'
import { complexTodoAction } from '@/app/todos/complex-example/complex-actions'
import { zComplexTodoSchema } from '@/app/todos/complex-example/complex-schemas'

// 🚀 **Reusable Client Hook**: Example of a more complex form using our custom hook
export default function ComplexTodoForm () {
  const { state, isPending, formRef, validateAndSubmit } = useFormAction(
    complexTodoAction,
    zComplexTodoSchema
  )

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>Add Detailed Todo</h2>

      <form ref={formRef} action={validateAndSubmit} className='space-y-4'>
        <div>
          <label htmlFor='title' className='block text-sm font-medium mb-1'>
            Title
          </label>
          <Input
            id='title'
            name='title'
            placeholder='Todo title'
            className='w-full'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium mb-1'
          >
            Description
          </label>
          {/* Using a regular textarea since we're not sure if Textarea component exists */}
          <textarea
            id='description'
            name='description'
            placeholder='Add details about your todo'
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            rows={3}
          />
        </div>

        <div>
          <label htmlFor='dueDate' className='block text-sm font-medium mb-1'>
            Due Date
          </label>
          <Input id='dueDate' type='date' name='dueDate' className='w-full' />
        </div>

        <div>
          <label htmlFor='priority' className='block text-sm font-medium mb-1'>
            Priority
          </label>
          <select
            id='priority'
            name='priority'
            className='w-full border rounded-md p-2'
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>

        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>

      {state.success && (
        <div className='p-3 bg-green-100 text-green-800 rounded-md'>
          {state.success}
        </div>
      )}
    </div>
  )
}
