import { z } from 'zod'

// 🚀 **Better Type Safety**: Zod schema for complex todo validation
export const zComplexTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a valid priority' })
  })
})

// Export the inferred type
export type ComplexTodoSchema = z.infer<typeof zComplexTodoSchema>
