'use server'

import { db } from '@/db'
import { todosTable } from '@/db/schemas/todos-schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { zTodoSchema } from '@/lib/zschemas'

type TodoState = {
  success?: string
  error?: string
}

export async function addTodoAction (state: TodoState, formData: FormData) {
  // first as a test, lets only allow authorized users
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return { error: 'Unauthorized' }
  }
  // just incase our client validation was not correctly setup
  // or we assume someone tries this directly, not from the form
  const data = Object.fromEntries(formData.entries())
  const result = zTodoSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const title = result.data.title as string

  try {
    console.log('adding task to imaginary db', title)

    await db.insert(todosTable).values({
      title,
      completed: false,
      id: crypto.randomUUID()
    })
    // this will then make sure /todos does a fresh fetch of the data, even if it had a stale time
    revalidatePath('/todos')

    return { success: 'Todo added successfully' }
  } catch (error: unknown) {
    // return { error: (error as Error).message ?? 'Failed to add todo' }
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
