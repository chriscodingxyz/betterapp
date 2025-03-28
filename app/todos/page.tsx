import React from 'react'
import ActionsForm from './ActionsForm'
import { db } from '@/db'
import { todosTable } from '@/db/schemas/todos-schema'
import { Button } from '@/components/ui/button'
import { deleteTodosAction } from './actions'

export default async function page () {
  const todos = await db.select().from(todosTable)

  return (
    <div>
      the form will be within here
      <ActionsForm />
      <div className='border border-black'>
        lets add all the todos here:
        {todos.map(todo => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
      <Button onClick={deleteTodosAction} variant='destructive'>
        delete
      </Button>
    </div>
  )
}
