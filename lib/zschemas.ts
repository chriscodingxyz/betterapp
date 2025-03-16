import { z } from 'zod'

// Zod schema for sign-in form
export const zSignInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

// Type derived from the Zod schema
export type SignInZod = z.infer<typeof zSignInSchema>

// simple todo
export const zTodoSchema = z.object({
  title: z.string().min(1, 'min of 1 character').max(10, 'max of 10 characters')
})

export type zTodoSchemaType = z.infer<typeof zTodoSchema>
