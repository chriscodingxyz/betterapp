// shared-code.ts
// Notice the import path is different from the client
import { formOptions } from '@tanstack/react-form/nextjs'
import { z } from 'zod'

export const schema = z.object({
  firstName: z.string().min(5, 'Name too short - schema'),
  age: z.coerce.number().gte(13, 'Age too low - schema')
})

export type SchemaType = z.input<typeof schema>

// You can pass other form options here
export const formOpts = formOptions({
  defaultValues: {
    firstName: '',
    age: 10
  } as SchemaType
})
