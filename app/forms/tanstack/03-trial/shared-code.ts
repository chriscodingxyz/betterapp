import { formOptions } from '@tanstack/react-form/nextjs'
import { z } from 'zod'

export const zSignInSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

export type zSignInType = z.input<typeof zSignInSchema>

export const formOpts = formOptions({
  defaultValues: {
    email: '',
    password: ''
  } as zSignInType
})
