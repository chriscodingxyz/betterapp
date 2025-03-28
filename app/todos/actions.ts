'use server'

import { db } from '@/db'
import { todosTable } from '@/db/schemas/todos-schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { zTodoSchema } from '@/lib/zschemas'
import { logCaller } from '@/lib/utils'
import { tryCatch } from '@/utils/tryCatch'
import { eq } from 'drizzle-orm'

// 🚀 **Better Type Safety**: Generic action state type that can include returned data
type ActionState<T = undefined> = {
  success?: string
  error?: string
  data?: T
}

// Original type preserved
type TodoState = {
  success?: string
  error?: string
}

export async function addTodoAction (state: TodoState, formData: FormData) {
  // first as a test, lets only allow authorized users
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    logCaller('action.ts - addTodoAction - no session')
    return { error: 'Unauthorized' }
  }

  // if (session.user.membershipType !== 'premium') {
  //   logCaller('action.ts - addTodoAction - not premium')
  //   return { error: 'Invalid memebrship type' }
  // }
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

// 🚀 **Reusable Form Action Creator**: Generic function to create server actions with consistent patterns
export async function createFormAction<T> (
  schema: {
    safeParse: (data: Record<string, unknown>) => {
      success: boolean
      error?: { errors: Array<{ message: string }> }
      data?: T
    }
  },
  processData: (validData: T) => Promise<ActionState<T>>
) {
  return async (
    state: ActionState<T>,
    formData: FormData
  ): Promise<ActionState<T>> => {
    // 🚀 Authentication check
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
      return { error: 'Unauthorized' }
    }

    // 🚀 Consistent validation pattern
    const data = Object.fromEntries(formData.entries())
    const result = schema.safeParse(data)

    if (!result.success) {
      return { error: result.error?.errors[0]?.message || 'Validation failed' }
    }

    // 🚀 Process valid data with error handling
    try {
      return await processData(result.data as T)
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
}

export async function deleteTodosAction () {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    logCaller('action.ts - deleteTodosAction - no session')
    return { error: 'Unauthorized' }
  }

  if (session.user.membershipType !== 'premium') {
    logCaller('action.ts - deleteTodosAction - not premium')
    return { error: 'Invalid memebrship type' }
  }

  const [data, error] = await tryCatch(
    db.delete(todosTable).where(eq(todosTable.completed, false))
  )

  if (error) {
    logCaller('actions.ts - deleteTodosAction ❌')
    return { error: error.message }
  }
  logCaller('actions.ts - deleteTodosAction ✅')
  revalidatePath('/todos')

  return { success: 'Todos deleted successfully', data }
}
