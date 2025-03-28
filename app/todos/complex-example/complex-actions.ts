'use server'

import { db } from '@/db'
import { todosTable } from '@/db/schemas/todos-schema'
import { revalidatePath } from 'next/cache'
import { zComplexTodoSchema } from '@/app/todos/complex-example/complex-schemas'
import { createFormAction } from '@/app/todos/actions'
import { ActionState } from '@/lib/hooks/form-action'

// Define the complex todo type
export type ComplexTodo = {
  title: string
  description?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
}

// 🚀 **Reusable Form Action Creator**: Example using our generic action creator
export const complexTodoAction = createFormAction<ComplexTodo>(
  zComplexTodoSchema,
  async validData => {
    try {
      console.log('Adding complex todo to database:', validData)

      // Create a new todo with the validated data - only use fields that exist in the actual schema
      // Adjust based on your actual database schema
      await db.insert(todosTable).values({
        id: crypto.randomUUID(),
        title: validData.title,
        completed: false
        // Store additional data as JSON or in a separate metadata field if your schema supports it
        // This would depend on your actual database schema
      })

      // Revalidate the todos page
      revalidatePath('/todos')

      // Return success response with the created data
      return {
        success: 'Todo added successfully',
        data: validData
      }
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
)

// Example of a direct action without using the creator
export async function addComplexTodoDirectly (
  state: ActionState<ComplexTodo>,
  formData: FormData
) {
  // This would have all the validation, auth checks, etc.
  // But here we're showing how the createFormAction simplifies all that

  // This is just for demonstration purposes
  const title = formData.get('title') as string

  return {
    success: `Added todo: ${title}`,
    data: { title, priority: 'medium' as const }
  }
}
