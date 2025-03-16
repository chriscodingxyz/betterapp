'use server'

import { db } from '@/db'
import { todosTable } from '@/db/schemas/todos-schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

type TodoState = {
  success?: string
  error?: string
}

export async function addTodoAction (state: TodoState, formData: FormData) {
  const title = formData.get('title') as string
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  try {
    console.log('adding task to imaginary db', title)

    await db.insert(todosTable).values({
      title,
      completed: false,
      id: crypto.randomUUID()
    })

    return { success: 'Todo added successfully' }
  } catch (error: unknown) {
    return { error: (error as Error).message ?? 'Failed to add todo' }
  } finally {
    revalidatePath('/todos')
  }
}
