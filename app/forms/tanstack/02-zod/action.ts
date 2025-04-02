// action.ts
'use server'

// Notice the import path is different from the client
import {
  ServerValidateError,
  createServerValidate
} from '@tanstack/react-form/nextjs'
import { formOpts, schema } from './shared-code'

// Create the server action that will infer the types of the form from `formOpts`
const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: schema
})

export default async function someAction (prev: unknown, formData: FormData) {
  console.log('👾 OG formData', formData)
  try {
    const validatedData = await serverValidate(formData)

    await new Promise(resolve => setTimeout(resolve, 5000))

    console.log('👾 OG validated data ✅  ', validatedData)
    // Persist the form data to the database
    // await sql`
    //   INSERT INTO users (name, email, password)
    //   VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.password})
    // `
  } catch (e) {
    if (e instanceof ServerValidateError) {
      console.log('👾 e.formState', e.formState)
      console.log('👾 errrorr action', e.formState.errors[0].age)

      return e.formState
    }

    // Some other error occurred while validating your form
    throw e
  }
  console.log('👾 validated data ✅  ')
  // Your form has successfully validated!
}
