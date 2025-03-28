import { zSignInSchemaType } from '@/lib/zschemas'
import { formOptions } from '@tanstack/react-form/nextjs'

export const formOpts = formOptions({
  defaultValues: {
    email: '',
    password: ''
  } as zSignInSchemaType
})
