'use server'

import {
  ServerValidateError,
  createServerValidate
} from '@tanstack/react-form/nextjs'
import { formOpts } from './shared-code'
import { zSignInSchema } from './shared-code'

export const someAction = async (prev: unknown, formData: FormData) => {
  console.log('👾 OG formData', formData)
  try {
    const validatedData = await createServerValidate({
      ...formOpts,
      onServerValidate: zSignInSchema
    })(formData)

    await new Promise(resolve => setTimeout(resolve, 5000))

    console.log('👾 OG validated data ✅  ', validatedData)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      console.log('❌ error via server action')

      return e.formState
    }

    // Some other error occurred while validating your form
    throw e
  }
}
